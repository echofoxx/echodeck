param(
  [string]$RepoName = "echodeck",
  [ValidateSet("public", "private", "internal")]
  [string]$Visibility = "public"
)

$Description = "EchoDeck local-first desktop music player with local playback, playlists, EQ, visualizers, and source-aware streaming embeds."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git is required. Install Git for Windows or Xcode Command Line Tools on macOS."
  exit 1
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI is required. Install it from https://cli.github.com/ or with winget install GitHub.cli."
  exit 1
}

try {
  gh auth status | Out-Null
} catch {
  gh auth login
}

git init
git add .
git commit -m "Initial EchoDeck desktop app"
git branch -M main

$visibilityFlag = "--$Visibility"
gh repo create $RepoName $visibilityFlag --source=. --remote=origin --push --description $Description

gh repo view --web
