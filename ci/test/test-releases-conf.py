#!/usr/bin/env python3

import configparser
import glob
import json
import os
import pathlib
import re
import runpy
import sys
import tempfile
import unittest


REPO_ROOT = pathlib.Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / "ci" / "releases.conf"
GENERATOR_PATH = REPO_ROOT / "ci" / "gen-releases.py"


class ReleaseConfigurationTest(unittest.TestCase):
    def load_config(self):
        config = configparser.ConfigParser()
        config.read(CONFIG_PATH, encoding="utf-8")
        return config

    def test_generated_alpine_entries(self):
        fixture_paths = [
            "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso",
            "alpine/v3.22/releases/aarch64/alpine-minirootfs-3.22.5-aarch64.tar.gz",
            "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso.sha256",
            "alpine/v3.22/releases/aarch64/alpine-minirootfs-3.22.5-aarch64.tar.gz.asc",
            "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso.sha512",
        ]

        with tempfile.TemporaryDirectory() as temporary_directory:
            mirror_path = pathlib.Path(temporary_directory)
            output_path = mirror_path / "releases.json"
            for relative_path in fixture_paths:
                fixture_path = mirror_path.joinpath(*relative_path.split("/"))
                fixture_path.parent.mkdir(parents=True, exist_ok=True)
                fixture_path.touch()

            original_argv = sys.argv
            original_glob = glob.glob

            def normalized_glob(pattern, *args, **kwargs):
                paths = original_glob(pattern, *args, **kwargs)
                return [path.replace(os.sep, "/") for path in paths]

            try:
                sys.argv = [
                    str(GENERATOR_PATH),
                    str(mirror_path),
                    str(output_path),
                ]
                glob.glob = normalized_glob
                try:
                    runpy.run_path(str(GENERATOR_PATH), run_name="__main__")
                finally:
                    glob.glob = original_glob
            finally:
                sys.argv = original_argv

            generated = json.loads(output_path.read_text(encoding="utf-8"))

        alpine_entries = sorted(
            (
                entry
                for entry in generated
                if entry.get("release") == "Alpine Linux"
            ),
            key=lambda entry: entry["path"],
        )
        expected = [
            {
                "release": "Alpine Linux",
                "version": "3.22.5",
                "variant": "aarch64",
                "path": "alpine/v3.22/releases/aarch64/alpine-minirootfs-3.22.5-aarch64.tar.gz",
            },
            {
                "release": "Alpine Linux",
                "version": "3.22.5",
                "variant": "x86_64",
                "path": "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso",
            },
        ]
        self.assertEqual(alpine_entries, expected)
        for entry in generated:
            self.assertFalse(
                entry["path"].endswith((".iso.sha256", ".iso.sha512", ".tar.gz.asc")),
                entry,
            )

    def test_release_expressions_have_no_trailing_whitespace(self):
        config = self.load_config()
        for section in config.sections():
            expression = config[section]["exp"]
            re.compile(expression)
            self.assertIsNone(
                re.search(r"\s+\$$", expression),
                f"{section} expression has whitespace before terminal $",
            )

    def test_ubuntukylin_release_section_removed(self):
        config = self.load_config()
        self.assertNotIn("ubuntukylin", config.sections())


if __name__ == "__main__":
    unittest.main()
