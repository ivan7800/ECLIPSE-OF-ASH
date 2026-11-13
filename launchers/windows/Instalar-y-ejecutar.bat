@echo off
setlocal
cd /d "%~dp0..\.."
title Instalar ECLIPSE OF ASH 404
where node.exe >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js 22 o posterior desde https://nodejs.org/
  pause
  exit /b 1
)
node.exe scripts\install-dependencies.mjs
if errorlevel 1 (
  echo.
  echo La instalacion no se completo.
  pause
  exit /b 1
)
node.exe scripts\desktop.mjs
if errorlevel 1 (
  echo.
  echo No se pudo iniciar el juego.
  pause
  exit /b 1
)
echo.
echo Deja esta ventana abierta mientras juegas.
echo Pulsa Ctrl+C al terminar para cerrar el servidor.
pause >nul
endlocal
