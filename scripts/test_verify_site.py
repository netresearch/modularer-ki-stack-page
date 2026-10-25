"""The logo gate counts actual image sources rather than attribute or script text."""
import unittest

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
