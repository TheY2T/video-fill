# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-04-27

### Added
- Three fill modes: Off, Fill (`object-fit: fill`), Fullscreen (viewport-covering `position: fixed`)
- Per-domain persistence — mode is saved per hostname and restored on revisit
- Popup UI showing current site hostname and mode selector buttons
- Dark theme popup UI matching Video Speed Control style
- Content script auto-restores saved mode on page load without requiring popup interaction
- Support for Chrome 88+, Edge 88+, Brave, Opera 74+, Arc
