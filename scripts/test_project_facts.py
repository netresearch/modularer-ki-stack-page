"""Contract tests for the data shown to readers, independent of remote services."""
import unittest
import urllib.request

import project_facts
from io import BytesIO
from unittest.mock import patch

from project_facts import fetch, merge_product, validate_source


class FetchBoundaryTest(unittest.TestCase):
    def test_api_hostname_receives_token_and_decodes_json(self):
        with patch.dict("os.environ", {"GITHUB_TOKEN": "fixture-token"}), \
             patch("project_facts.OPENER.open", return_value=BytesIO(b'{"ok":true}')) as request:
            self.assertEqual(fetch("https://API.GITHUB.COM/repos/netresearch/example"), {"ok": True})
        self.assertEqual(request.call_args.args[0].get_header("Authorization"), "Bearer fixture-token")

    def test_deceptive_hostname_userinfo_and_path_are_not_the_github_api(self):
        for url in (
            "https://api.github.com.evil.invalid/repos/example",
            "https://api.github.com@evil.invalid/repos/example",
            "https://example.invalid/api.github.com/repos/example",
        ):
            with self.subTest(url=url), \
                 patch.dict("os.environ", {"GITHUB_TOKEN": "fixture-token"}), \
                 patch("project_facts.OPENER.open", return_value=BytesIO(b"plain source")) as request:
                self.assertEqual(fetch(url), "plain source")
                self.assertIsNone(request.call_args.args[0].get_header("Authorization"))

    def test_raw_json_file_with_query_never_receives_api_token(self):
        with patch.dict("os.environ", {"GITHUB_TOKEN": "fixture-token"}), \
             patch("project_facts.OPENER.open", return_value=BytesIO(b'{"name":"example"}')) as request:
            self.assertEqual(fetch("https://raw.githubusercontent.com/netresearch/example/main/composer.json?ref=main"), {"name": "example"})
        self.assertIsNone(request.call_args.args[0].get_header("Authorization"))

    def test_plain_http_is_rejected_before_request(self):
        with patch("project_facts.OPENER.open") as request:
            with self.assertRaises(ValueError):
                fetch("http://api.github.com/repos/netresearch/example")
        request.assert_not_called()

    def test_redirect_does_not_forward_api_authorization(self):
        with patch.dict("os.environ", {"GITHUB_TOKEN": "fixture-token"}), \
             patch("project_facts.OPENER.open", return_value=BytesIO(b'{"ok":true}')) as opened:
            fetch("https://api.github.com/repos/netresearch/example")
        first = opened.call_args.args[0]
        handler = next(item for item in project_facts.OPENER.handlers
                       if isinstance(item, project_facts.HttpsRedirectHandler))
        redirected = handler.redirect_request(
            first, None, 302, "Found", {}, "https://other.example.test/result.json",
        )
        self.assertEqual(first.get_header("Authorization"), "Bearer fixture-token")
        self.assertIsNone(redirected.get_header("Authorization"))

    def test_redirect_refuses_downgrade_before_following_it(self):
        handler = next((item for item in project_facts.OPENER.handlers
                        if isinstance(item, project_facts.HttpsRedirectHandler)), None)
        self.assertIsNotNone(handler)
        request = urllib.request.Request("https://api.github.com/example")
        secure = handler.redirect_request(request, None, 302, "Found", {}, "https://other.example.test/result")
        self.assertEqual(secure.full_url, "https://other.example.test/result")
        for scheme in ("http", "ftp"):
            with self.subTest(scheme=scheme), self.assertRaises(ValueError):
                handler.redirect_request(secure, None, 302, "Found", {}, f"{scheme}://other.example.test/result")


class ProjectFactsTest(unittest.TestCase):
    def test_http_guard_uses_tagged_alpha_requirements_without_a_portfolio_record(self):
        repository = "https://github.com/netresearch/typo3_http_guard"
        product = merge_product(
            "nr-http-guard", repository, {}, {},
            {"name": "netresearch/nr-http-guard", "require": {
                "php": "^8.2", "typo3/cms-core": "^13.4.36 || ^14.3.8", "ext-curl": "*",
            }}, "'state' => 'alpha'", {"tag_name": "v0.1.4", "published_at": "2026-10-18T17:45:25Z"}, "now",
        )
        self.assertEqual("alpha", product["stage"])
        self.assertEqual("v0.1.4", product["latest_release"])
        self.assertEqual("netresearch/nr-http-guard", product["composer_package"])
        self.assertEqual("^8.2", product["php"])
        self.assertEqual("^13.4.36 || ^14.3.8", product["typo3"])
        self.assertEqual([], product["dependencies"])
        self.assertEqual(repository + "/blob/v0.1.4/ext_emconf.php", product["stage_source"])
        self.assertEqual(repository + "/blob/v0.1.4/composer.json", product["requirements_source"])

    def test_current_product_release_replaces_an_older_portfolio_snapshot(self):
        product = merge_product(
            "nr-llm", "https://github.com/netresearch/t3x-nr-llm",
            {"stage": "beta", "latest_release": "v0.36.0"},
            {"repository": "https://github.com/netresearch/t3x-nr-llm", "stage": "beta"},
            {"require": {"php": "^8.2", "typo3/cms-core": "^13.4 || ^14.3"}},
            "'state' => 'stable'", {"tag_name": "v0.41.4", "published_at": "2026-10-24T01:16:15Z"},
            "2026-10-24T12:00:00Z",
        )
        self.assertEqual(product["latest_release"], "v0.41.4")
        self.assertEqual(product["stage"], "beta")
        self.assertEqual(product["php"], "^8.2")
        self.assertEqual(product["typo3"], "^13.4 || ^14.3")
        self.assertIn("v0.41.4/composer.json", product["requirements_source"])

    def test_content_module_uses_declared_maturity_and_does_not_invent_a_release(self):
        product = merge_product(
            "nr-repurpose", "https://github.com/netresearch/t3x-nr-repurpose", {"page": None}, {},
            {"require": {"php": "^8.3", "typo3/cms-core": "^14.3", "netresearch/nr-llm": "^0.41"}},
            "'state' => 'alpha'", None, "2026-10-24T12:00:00Z",
        )
        self.assertEqual(product["stage"], "alpha")
        self.assertIsNone(product["latest_release"])
        self.assertEqual(product["requirements_ref"], "main")
        self.assertEqual(product["dependencies"], ["nr-llm"])
        self.assertEqual(product["page"], "https://github.com/netresearch/t3x-nr-repurpose")

    def test_missing_requirements_stop_publication(self):
        with self.assertRaises(ValueError):
            merge_product("example", "https://github.com/netresearch/example", {}, {}, {}, "", None, "now")

    def test_frontend_passkeys_keep_the_required_backend_passkey_dependency(self):
        product = merge_product(
            "nr-passkeys-fe", "https://github.com/netresearch/t3x-nr-passkeys-fe", {}, {},
            {"require": {"php": "^8.2", "typo3/cms-core": "^13.4 || ^14.3", "netresearch/nr-passkeys-be": "^1.0"}},
            "'state' => 'stable'", {"tag_name": "v2.0.0", "published_at": "2026-09-29T22:25:36Z"}, "now",
        )
        self.assertEqual(product["dependencies"], ["nr-passkeys-be"])
        self.assertNotIn("nr-llm", product["dependencies"])

    def test_maturity_source_follows_the_field_used_not_manifest_presence(self):
        product = merge_product(
            "nr-llm", "https://github.com/netresearch/t3x-nr-llm",
            {"stage": "beta", "stage_source": "https://example.test/editorial-assessment"},
            {"repository": "https://github.com/netresearch/t3x-nr-llm"},
            {"require": {"php": "^8.2", "typo3/cms-core": "^13.4 || ^14.3"}},
            "'state' => 'stable'", None, "now",
        )
        self.assertEqual(product["stage"], "beta")
        self.assertEqual(product["stage_source"], "https://example.test/editorial-assessment")

    def test_manifest_for_another_repository_is_not_accepted(self):
        with self.assertRaises(ValueError):
            validate_source({"repository": "https://github.com/other/project"}, "https://github.com/netresearch/t3x-nr-llm")


if __name__ == "__main__":
    unittest.main()
