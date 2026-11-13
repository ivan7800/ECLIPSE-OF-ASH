import { afterEach, expect, test } from 'vitest';
import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
import { resolve } from 'node:path';

let server:ChildProcess|undefined;

afterEach(async()=>{
  if(!server?.pid)return;
  server.kill('SIGTERM');
  await Promise.race([once(server,'exit'),delay(1500)]);
  if(server.exitCode===null) server.kill('SIGKILL');
  server=undefined;
});

test('servidor de escritorio usa dist junto a su propio script y publica artefactos',async()=>{
  server=spawn(process.execPath,[resolve('scripts/desktop.mjs')],{
    cwd:resolve('launchers/linux-mint'),
    env:{...process.env,ECLIPSE_PORT:'0'},
    stdio:['ignore','pipe','pipe']
  });
  let output='';
  server.stdout?.on('data',chunk=>output+=chunk.toString());
  server.stderr?.on('data',chunk=>output+=chunk.toString());
  let address:string|undefined;
  for(let attempt=0;attempt<40;attempt++){
    address=output.match(/http:\/\/127\.0\.0\.1:\d+\/ECLIPSE-OF-ASH-404\//)?.[0];
    if(address)break;
    if(server.exitCode!==null)break;
    await delay(50);
  }
  expect(server.exitCode,'el servidor se cerró: '+output).toBeNull();
  expect(address,'el lanzador no imprimió el enlace: '+output).toBeTruthy();
  const response=await fetch(address!);
  expect(response.status).toBe(200);
  const html=await response.text();
  const asset=html.match(/src="(.+?\.js)"/);
  expect(asset).toBeTruthy();
  expect((await fetch(new URL(asset![1],address))).status).toBe(200);
  for(const file of ['manifest.webmanifest','sw.js','assets/three-license.txt'])
    expect((await fetch(new URL(file,address))).status).toBe(200);
});

test('scripts de Windows y Linux toleran rutas móviles y comprueban dependencias',async()=>{
  const quickWin=await import('node:fs/promises').then(fs=>fs.readFile('INICIAR-WINDOWS.bat','utf8'));
  const quickLinux=await import('node:fs/promises').then(fs=>fs.readFile('INICIAR-LINUX.sh','utf8'));
  const desktop=await import('node:fs/promises').then(fs=>fs.readFile('INICIAR-LINUX.desktop','utf8'));
  expect(quickWin).toContain('launchers\\windows\\Iniciar-Eclipse.bat');
  expect(quickLinux).toContain('launchers/linux-mint/start.sh');
  expect(desktop).toContain('python3 -c');
  expect(desktop).toContain('%k');
  expect(desktop).toContain('Terminal=true');
  const nestedDesktop=await import('node:fs/promises').then(fs=>fs.readFile('launchers/linux-mint/Eclipse-404.desktop','utf8'));
  expect(nestedDesktop).toContain('python3 -c');
  const installDesktop=await import('node:fs/promises').then(fs=>fs.readFile('launchers/linux-mint/Instalar-y-ejecutar.desktop','utf8'));
  expect(installDesktop).toContain('launchers/linux-mint/install.sh');
  const bat=await import('node:fs/promises').then(fs=>fs.readFile('launchers/windows/Iniciar-Eclipse.bat','utf8'));
  expect(bat).toContain('cd /d "%~dp0..\\.."');
  expect(bat).toContain('if %NODE_MAJOR% LSS 22');
  expect(bat).toContain('node.exe scripts\\desktop.mjs');
  expect(bat).toContain('Node.js 22');
  const {readFile}=await import('node:fs/promises');
  const linux=await readFile('launchers/linux-mint/start.sh','utf8');
  expect(linux).toContain('readlink -f');
  expect(linux).toContain('scripts/desktop.mjs');
  expect(linux).toContain('process.exitCode = Number');
  const installer=await readFile('launchers/linux-mint/install.sh','utf8');
  expect(installer).toContain('npm ci');
});
