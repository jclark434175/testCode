# Installs WSL2 with Ubuntu on Windows 10 (2004+) or Windows 11.
#
# Run from an ELEVATED PowerShell prompt:
#   powershell -ExecutionPolicy Bypass -File .\install-wsl.ps1
#
# A reboot is required after installation. After rebooting and finishing
# Ubuntu's first-run setup, run install-dev-tools.sh from inside WSL.

$ErrorActionPreference = "Stop"

# Verify elevation
$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This script must be run as Administrator."
    exit 1
}

Write-Host "Installing WSL2 with Ubuntu (default distribution)..."
wsl --install -d Ubuntu

Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Reboot Windows."
Write-Host "  2. After reboot, Ubuntu will launch and prompt you to create a UNIX user/password."
Write-Host "  3. Inside the Ubuntu shell, clone this repo and run:"
Write-Host "       bash install-dev-tools.sh"
Write-Host ""
Write-Host "To install Docker Desktop on Windows with WSL2 backend instead of Docker inside"
Write-Host "WSL, run install-dev-tools.ps1 on Windows after the reboot."
