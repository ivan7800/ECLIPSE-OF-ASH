#!/usr/bin/env bash
set -Eeuo pipefail
cd -- "$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")/../.."
printf '%s\n' 'ECLIPSE OF ASH 404 · comprobando requisitos'

if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'No se encontró Node.js. Instala la versión LTS desde nodejs.org y ejecuta este lanzador otra vez.' >&2
  exit 1
fi
if ! node -e 'process.exitCode = Number(process.versions.node.split(".")[0]) < 22 ? 1 : 0'; then
  printf 'Se necesita Node.js 22 o posterior. Versión encontrada: %s\n' "$(node --version)" >&2
  exit 1
fi
command -v npm >/dev/null || { printf '%s\n' 'No se encontró npm.' >&2; exit 1; }
[[ -f package-lock.json && -f scripts/desktop.mjs ]] || { printf '%s\n' 'Faltan archivos. Extrae primero la carpeta completa.' >&2; exit 1; }
npm ci --no-audit --no-fund
printf '%s\n' 'Instalación terminada. Iniciando el juego…'
node scripts/desktop.mjs
