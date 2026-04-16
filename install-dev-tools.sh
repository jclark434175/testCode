#!/usr/bin/env bash
set -euo pipefail

OS="$(uname -s)"

install_homebrew() {
    if command -v brew >/dev/null 2>&1; then
        echo "Homebrew already installed: $(brew --version | head -n1)"
        return
    fi
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    if [ "$OS" = "Linux" ] && [ -d /home/linuxbrew/.linuxbrew ]; then
        eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    elif [ -d /opt/homebrew ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -d /usr/local/Homebrew ]; then
        eval "$(/usr/local/bin/brew shellenv)"
    fi
}

install_node() {
    if command -v node >/dev/null 2>&1; then
        echo "Node already installed: $(node --version)"
        return
    fi
    echo "Installing Node.js..."
    brew install node
}

install_docker() {
    if command -v docker >/dev/null 2>&1; then
        echo "Docker already installed: $(docker --version)"
        return
    fi
    echo "Installing Docker..."
    if [ "$OS" = "Darwin" ]; then
        brew install --cask docker
        echo "Docker Desktop installed. Launch it from Applications to start the daemon."
    else
        brew install docker
        echo "Docker CLI installed via Homebrew. For the daemon on Linux, install Docker Engine from https://docs.docker.com/engine/install/"
    fi
}

main() {
    install_homebrew
    install_node
    install_docker
    echo "Done."
}

main "$@"
