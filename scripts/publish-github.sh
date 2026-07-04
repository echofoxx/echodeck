#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-echodeck-macos}"
VISIBILITY="${2:-public}"
DESCRIPTION="EchoDeck local-first macOS music player with local playback, playlists, EQ, visualizers, and source-aware streaming embeds."

if ! command -v git >/dev/null 2>&1; then
  echo "git is required. Install Xcode Command Line Tools: xcode-select --install"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI is required. Install it from https://cli.github.com/ or with: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  gh auth login
fi

git init
git add .
git commit -m "Initial EchoDeck v0.1.0 local macOS app" || true
git branch -M main

gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --push --description "$DESCRIPTION"

gh repo view --web
