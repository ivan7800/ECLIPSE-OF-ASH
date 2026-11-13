#!/usr/bin/env bash
set -Eeuo pipefail
cd -- "$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")/../.."
pause_before_exit() {
  local status=$?
  if [[ -t 0 ]]; then
    if (( status == 0 )); then read -rp "Pulsa Intro al terminar para cerrar..." _ || true
    else read -rp "Pulsa Intro para cerrar..." _ || true
    fi
  fi
  return "$status"
}
trap pause_before_exit EXIT

if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Falta Node.js 22 o posterior. Instálalo desde nodejs.org.'
  exit 1
fi
if ! node -e 'process.exitCode = Number(process.versions.node.split(".")[0]) < 22 ? 1 : 0'; then
  printf 'Se necesita Node.js 22 o posterior. Versión encontrada: %s\n' "$(node --version)"
  exit 1
fi
if [[ ! -f dist/index.html ]]; then
  printf '%s\n' 'Falta la compilación. Ejecuta primero launchers/linux-mint/install.sh.'
  exit 1
fi
node scripts/desktop.mjs
