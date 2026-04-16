# Installs Node.js and Docker Desktop on Windows via winget.
# Homebrew is not supported on Windows; the closest equivalents are winget (built-in)
# or Chocolatey. This script uses winget.
#
# Run from an elevated PowerShell prompt:
#   powershell -ExecutionPolicy Bypass -File .\install-dev-tools.ps1

$ErrorActionPreference = "Stop"

function Test-Command($name) {
    $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command winget)) {
    Write-Error "winget not found. Install 'App Installer' from the Microsoft Store, then re-run."
    exit 1
}

function Install-WithWinget($id, $displayName) {
    Write-Host "Installing $displayName..."
    winget install --id $id --exact --accept-source-agreements --accept-package-agreements
}

if (Test-Command node) {
    Write-Host "Node already installed: $(node --version)"
} else {
    Install-WithWinget "OpenJS.NodeJS.LTS" "Node.js LTS"
}

if (Test-Command docker) {
    Write-Host "Docker already installed: $(docker --version)"
} else {
    Install-WithWinget "Docker.DockerDesktop" "Docker Desktop"
    Write-Host "Docker Desktop installed. Launch it from the Start menu to start the daemon."
}

Write-Host ""
Write-Host "Note: Homebrew is macOS/Linux only. On Windows, winget (used here) or Chocolatey"
Write-Host "are the standard package managers. If you need Homebrew specifically, install WSL2"
Write-Host "and run install-dev-tools.sh inside a Linux distribution."

Write-Host "Done."
