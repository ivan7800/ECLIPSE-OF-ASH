@echo off
setlocal
cd /d "%~dp0..\.."
title ECLIPSE OF ASH 404
where node.exe >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js 22 o posterior desde https://nodejs.org/
  pause
  exit /b 1
)
for /f "delims=" %%v in ('node.exe -p "Number(process.versions.node.split('.')[0])"') do set "NODE_MAJOR=%%v"
if not defined NODE_MAJOR (
  echo No se pudo detectar la version de Node.js.
  pause
  exit /b 1
)
if %NODE_MAJOR% LSS 22 (
  echo Se necesita Node.js 22 o posterior. Version encontrada: %NODE_MAJOR%.
  pause
  exit /b 1
)
node.exe scripts\desktop.mjs
if errorlevel 1 (
  echo.
  echo No se pudo iniciar el juego. Copia el mensaje para diagnosticarlo.
  pause
  exit /b 1
)
echo.
echo Deja esta ventana abierta mientras juegas.
echo Pulsa Ctrl+C al terminar para cerrar el servidor.
pause >nul
endlocal
