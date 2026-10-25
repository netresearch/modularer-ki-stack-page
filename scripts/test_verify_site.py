"""The logo gate counts actual image sources rather than attribute or script text."""
import unittest
from check_contact_links import check_contact_links


class BusinessContactTest(unittest.TestCase):
    def test_valid_footer_cannot_hide_a_broken_hero_or_header(self):
        query = "?utm_source=pages&amp;utm_medium=referral&amp;utm_campaign=stack&amp;utm_content=hero"
        for lang, path in (("de", "kontakt/"), ("en", "en/contact/")):
            valid = f"https://www.netresearch.de/{path}{query}"
            footer = f'<a data-cta="business" href="{valid}">Contact</a>'
            self.assertEqual(check_contact_links(footer, lang), [])
            self.assertEqual(check_contact_links("<a href='https://example.org/'>Source</a>" + footer, lang), [])
            invalid = ("https://example.org/", "/kontakt/", "https://[", "https://www.netresearch.de/other/", valid.replace("utm_medium=", "other="), valid.replace("utm_medium=referral", "utm_medium="))
            for href in invalid:
                for marker in ('data-cta="business"', 'class="nr-shell-contact"'):
                    with self.subTest(lang=lang, href=href, marker=marker):
                        self.assertTrue(check_contact_links(f'<a {marker} href="{href}">Hero</a>' + footer, lang))
            self.assertTrue(check_contact_links('<a data-cta="business">Hero</a>' + footer, lang))

from verify_site import count_brand_logos


class BrandLogoTest(unittest.TestCase):
    def test_relative_and_absolute_symbol_sources_are_counted(self):
        for prefix in ("", "../", "../../../", "https://netresearch.github.io/modularer-ki-stack-page/"):
            with self.subTest(prefix=prefix):
                self.assertEqual(count_brand_logos(f'<img src="{prefix}assets/site-shell/netresearch-symbol-only.svg" alt="Netresearch">'), 1)

    def test_an_attribute_mention_is_not_a_logo_source(self):
        self.assertEqual(count_brand_logos('<img src="diagram.svg" alt="assets/site-shell/netresearch-symbol-only.svg">'), 0)

    def test_quoted_greater_than_does_not_end_the_image_tag(self):
        self.assertEqual(count_brand_logos('<img alt="Company > Netresearch" src="assets/site-shell/netresearch-symbol-only.svg">'), 1)

    def test_markup_inside_script_text_is_not_an_image(self):
        self.assertEqual(count_brand_logos('<script>const example = \'<img src="assets/site-shell/netresearch-symbol-only.svg">\';</script>'), 0)

    def test_duplicate_real_logos_remain_a_gate_failure(self):
        self.assertEqual(count_brand_logos('<img src="assets/site-shell/netresearch-symbol-only.svg">' * 2), 2)

    def test_incomplete_image_and_large_nonlogo_attribute_are_not_counted(self):
        self.assertEqual(count_brand_logos('<img alt="' + 'x' * 100_000), 0)


if __name__ == "__main__":
    unittest.main()
