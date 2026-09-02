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


def fixture(section, path, release, version=None, variant=None):
    expected = {"release": release, "path": path}
    if version is not None:
        expected["version"] = version
    if variant is not None:
        expected["variant"] = variant
    return {"section": section, "path": path, "expected": expected}


RELEASE_FIXTURES = [
    fixture(
        "arch",
        "archlinux/iso/2026.09.01/archlinux-x86_64.iso",
        "Arch Linux",
        version="2026.09.01",
    ),
    fixture(
        "debian",
        "debian-cd/13.1.0/amd64/iso-dvd/debian-13.1.0-amd64-DVD-1.iso",
        "Debian",
        version="13.1.0",
        variant="amd64",
    ),
    fixture(
        "debian-livecd",
        "debian-cd/12.1.0-live/amd64/iso-hybrid/debian-live-12.1.0-amd64-xfce.iso",
        "Debian Live CD (amd64)",
        version="12.1.0",
        variant="12.1.0-amd64-xfce",
    ),
    fixture(
        "deepin",
        "deepin-cd/23.1.0/deepin-desktop-amd64.iso",
        "deepin",
        version="23.1.0",
    ),
    fixture(
        "golang",
        "golang/go1.24.6.linux-amd64.tar.gz",
        "Golang",
        version="1.24.6",
        variant="linux",
    ),
    fixture(
        "kali",
        "kali-images/kali-2026.1/kali-linux-2026.1-installer-amd64.iso",
        "Kali Linux",
        version="2026.1",
        variant="2026.1-installer-amd64",
    ),
    fixture(
        "kali-vm",
        "kali-images/kali-2026.1/kali-linux-2026.1-virtualbox-amd64.7z",
        "Kali Virtual Machine Image",
        version="2026.1",
        variant="2026.1-virtualbox-amd64",
    ),
    fixture(
        "openEuler",
        "openeuler/openEuler-24.03/ISO/amd64/openEuler-24.03-amd64.iso",
        "openEuler",
        version="24.03",
        variant="24.03-amd64",
    ),
    fixture(
        "openkylin",
        "openkylin-cdimage/2.0/openKylin-2.0-amd64.iso",
        "openKylin",
        version="2.0",
    ),
    fixture(
        "ubuntu",
        "ubuntu-releases/24.04.3/ubuntu-24.04.3-desktop-amd64.iso",
        "Ubuntu",
        version="24.04.3",
        variant="24.04.3-desktop-amd64",
    ),
    fixture(
        "virtualbox",
        "virtualbox/7.1.8/VirtualBox-7.1.8-Windows.exe",
        "Virtualbox",
        version="7.1.8",
        variant="Windows",
    ),
    fixture(
        "virtualbox-pkg",
        "virtualbox/7.1.8/virtualbox-7.1.8-amd64.deb",
        "Virtualbox (package manager)",
        version="7.1.8",
    ),
    fixture(
        "buildroot",
        "buildroot/buildroot-2026.02.tar.gz",
        "Buildroot",
        version="2026.02",
    ),
    fixture(
        "mint",
        "linuxmint-cd/stable/22.1/linuxmint-22.1-cinnamon-amd64.iso",
        "Linux Mint",
        version="22.1",
        variant="cinnamon",
    ),
    fixture(
        "msys2",
        "msys2/distrib/msys2-x86_64-2026.08.31.exe",
        "Msys2",
    ),
    fixture(
        "mxlinux",
        "mxlinux-isos/MX/Final/23.4/MX-23.4_x64.iso",
        "Mxlinux",
        version="23.4",
        variant="23.4_x64",
    ),
    fixture(
        "7zip",
        "github-release/ip7z/7zip/24.09/7z2409-x64.exe",
        "7-Zip",
        version="24.09",
        variant="exe",
    ),
    fixture(
        "rustdesk",
        "github-release/rustdesk/rustdesk/1.3.8/rustdesk-x86_64-unknown-linux-gnu.AppImage",
        "RustDesk",
        version="1.3.8",
        variant="AppImage",
    ),
    fixture(
        "alpine",
        "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso",
        "Alpine Linux",
        version="3.22.5",
        variant="x86_64",
    ),
    fixture(
        "alpine",
        "alpine/v3.22/releases/aarch64/alpine-minirootfs-3.22.5-aarch64.tar.gz",
        "Alpine Linux",
        version="3.22.5",
        variant="aarch64",
    ),
    fixture(
        "aosc-os",
        "anthon/aosc-os/os-2026.08/installer/aosc-os_installer_20260831_x86_64.iso",
        "AOSC OS",
        version="20260831",
        variant="2026.08",
    ),
]

ALPINE_EXCLUDED_PATHS = [
    "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso.sha256",
    "alpine/v3.22/releases/x86_64/alpine-standard-3.22.5-x86_64.iso.sha512",
    "alpine/v3.22/releases/aarch64/alpine-minirootfs-3.22.5-aarch64.tar.gz.asc",
]


REPO_ROOT = pathlib.Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / "ci" / "releases.conf"
GENERATOR_PATH = REPO_ROOT / "ci" / "gen-releases.py"


class ReleaseConfigurationTest(unittest.TestCase):
    def load_config(self):
        config = configparser.ConfigParser()
        config.read(CONFIG_PATH, encoding="utf-8")
        return config

    def generate_releases(self):
        fixture_paths = [
            fixture["path"] for fixture in RELEASE_FIXTURES
        ] + ALPINE_EXCLUDED_PATHS

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
                runpy.run_path(str(GENERATOR_PATH), run_name="__main__")
            finally:
                glob.glob = original_glob
                sys.argv = original_argv

            return json.loads(output_path.read_text(encoding="utf-8"))

    def test_all_release_fixtures_generate_expected_entries(self):
        expected_entries = [
            fixture["expected"] for fixture in RELEASE_FIXTURES
        ]
        generated = self.generate_releases()
        generated_by_path = {entry["path"]: entry for entry in generated}

        self.assertEqual(len(generated), len(expected_entries))
        self.assertEqual(
            set(generated_by_path),
            {entry["path"] for entry in expected_entries},
        )
        self.assertEqual(len(generated_by_path), len(generated))

        for expected in expected_entries:
            actual = generated_by_path[expected["path"]]
            for field, value in expected.items():
                self.assertEqual(actual.get(field), value, expected)
            for field in ("version", "variant"):
                if field not in expected:
                    self.assertNotIn(field, actual, expected)

    def test_alpine_extensions_and_artifacts(self):
        generated = self.generate_releases()
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
                entry["path"].endswith(
                    (".iso.sha256", ".iso.sha512", ".tar.gz.asc")
                ),
                entry,
            )

    def test_release_expressions_are_valid(self):
        config = self.load_config()
        for section in config.sections():
            expression = config[section]["exp"]
            compiled = re.compile(expression)
            self.assertIsNone(
                re.search(r"\s+\$$", expression),
                f"{section} expression has whitespace before terminal $",
            )
            for option in ("release", "version", "variant"):
                if option in config[section]:
                    group_index = int(config[section][option])
                    self.assertGreaterEqual(group_index, 0, section)
                    self.assertLessEqual(
                        group_index,
                        compiled.groups,
                        f"{section} {option} capture group is out of range",
                    )

    def test_every_release_section_has_a_fixture(self):
        config = self.load_config()
        configured_sections = set(config.sections())
        fixture_sections = {
            fixture["section"] for fixture in RELEASE_FIXTURES
        }
        self.assertEqual(fixture_sections, configured_sections)

        for fixture in RELEASE_FIXTURES:
            section = fixture["section"]
            expected_release = (
                config[section]["name"]
                if "name" in config[section]
                else section
            )
            self.assertEqual(
                fixture["expected"]["release"],
                expected_release,
                section,
            )

    def test_ubuntukylin_release_section_removed(self):
        config = self.load_config()
        self.assertNotIn("ubuntukylin", config.sections())


if __name__ == "__main__":
    unittest.main()
