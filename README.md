# Dev tools setup

Scripts to install Homebrew, Node.js, and Docker across platforms.

## Windows (via WSL2 — recommended for Homebrew)

1. Open **PowerShell as Administrator**.
2. Bootstrap WSL2 + Ubuntu:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\install-wsl.ps1
   ```
3. Reboot. Ubuntu launches on first login and prompts for a UNIX user/password.
4. Inside Ubuntu, clone this repo and run:
   ```bash
   bash install-dev-tools.sh
   ```

## Windows (native, no Homebrew)

Homebrew is not supported on Windows. Use `winget` instead:
```powershell
powershell -ExecutionPolicy Bypass -File .\install-dev-tools.ps1
```
Installs Node.js LTS and Docker Desktop.

## macOS / Linux

```bash
bash install-dev-tools.sh
```
Installs Homebrew, then Node.js and Docker via brew.
