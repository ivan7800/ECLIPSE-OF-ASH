import { expect, test, type Page } from '@playwright/test';
import { fresh } from '../src/core/state';

async function start(page:Page) {
  await page.goto('./');
  await expect(page.getByRole('heading',{level:1})).toContainText('ECLIPSE');
  await page.getByRole('button',{name:'Nueva partida'}).click();
  await page.getByRole('button',{name:'Empezar'}).first().click();
  await expect(page.getByRole('heading',{name:'La noche recuerda'})).toBeVisible();
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await expect(page.locator('#location')).toHaveText('Bosque de los Susurros');
}

async function press(page:Page,key:string,time=120) {
  await page.keyboard.down(key);
  await page.waitForTimeout(time);
  await page.keyboard.up(key);
}

test('compilación bajo la ruta de Pages, controles, menús y persistencia',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error') errors.push(message.text());});
  await start(page);
  const hint=page.locator('#hint');
  await expect(hint).toBeHidden();
  await press(page,'Space',110);
  await page.waitForTimeout(260);
  await press(page,'m');
  await expect(page.getByRole('heading',{name:'Bosque de los Susurros'})).toBeVisible();
  await press(page,'Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await press(page,'m');
  await expect(page.locator('.cartography .you')).toHaveCount(1);
  await page.getByRole('button',{name:'Volver',exact:true}).click();
  await page.getByRole('button',{name:'Pausa',exact:true}).click();
  await page.getByRole('button',{name:'Inventario y equipo'}).click();
  await expect(page.getByText('Busca el primer relicario')).toBeVisible();
  await page.getByRole('button',{name:'Volver',exact:true}).click();
  await page.getByRole('button',{name:'Configuración',exact:true}).click();
  await page.getByLabel('Reducir movimiento y destellos').check();
  await page.getByLabel('Volumen general').fill('0');
  await expect(page.locator('#game')).toHaveClass(/reduced/);
  await page.getByRole('button',{name:'Volver',exact:true}).click();
  await page.getByRole('button',{name:'Guardar partida',exact:true}).click();
  await expect(page.locator('[data-notice]')).toHaveText('Partida guardada.');
  await page.reload();
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).first().click();
  await expect(page.locator('#location')).toHaveText('Bosque de los Susurros');
  expect(errors).toEqual([]);
});

test('manifiesto, service worker y arranque offline',async({page,context})=>{
  await page.goto('./');
  const manifest=await page.locator('link[rel=manifest]').getAttribute('href');
  expect(manifest).toBe('./manifest.webmanifest');
  const response=await page.request.get('manifest.webmanifest');
  expect(response.ok()).toBeTruthy();
  expect((await response.json()).start_url).toBe('./');
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('button',{name:'Nueva partida'})).toBeVisible();
  await page.getByRole('button',{name:'Nueva partida'}).click();
  await expect(page.getByRole('heading',{name:'Espacios de guardado'})).toBeVisible();
});

test('pantalla móvil y controles táctiles',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:'+(process.env.ECLIPSE_TEST_PORT??4173)+'/ECLIPSE-OF-ASH-404/');
  await page.getByRole('button',{name:'Nueva partida'}).tap();
  await page.getByRole('button',{name:'Empezar'}).first().tap();
  await expect(page.getByRole('dialog').getByRole('heading',{name:'La noche recuerda'})).toBeVisible();
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).tap();
  await expect(page.getByRole('button',{name:'Atacar',exact:true})).toBeVisible();
  const joystick=await page.locator('.joystick').boundingBox();
  expect(joystick?.width).toBeGreaterThan(80);
  await page.getByRole('button',{name:'Atacar',exact:true}).tap();
  const cdp=await context.newCDPSession(page);
  const x=joystick!.x+joystick!.width/2+34;
  const y=joystick!.y+joystick!.height/2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await page.waitForTimeout(1000);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await page.getByRole('button',{name:'Pausa',exact:true}).tap();
  await expect(page.getByRole('heading',{name:'En pausa'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Volver al juego'})).toBeVisible();
  await page.getByRole('button',{name:'Mapa',exact:true}).tap();
  const position=await page.locator('.cartography .you').evaluate(el=>Array.from(el.parentNode!.children).indexOf(el));
  expect(position%23).toBeGreaterThan(3);
  await context.close();
});


test('importación y exportación JSON, audio activado por gesto y entrada al Santuario',async({page})=>{
  await page.addInitScript(()=>{
    const source=window.AudioContext;
    window.AudioContext=class extends source {
      override createOscillator(){
        document.documentElement.dataset.score='scheduled';
        return super.createOscillator();
      }
    };
  });
  await page.goto('./');
  await expect(page.locator('html')).not.toHaveAttribute('data-score','scheduled');
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Espacios de guardado'})).toBeVisible();
  const [picker]=await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button',{name:'Importar',exact:true}).first().click()
  ]);
  await picker.setFiles({name:'entrada.json',mimeType:'application/json',
    buffer:Buffer.from(JSON.stringify({...fresh(),position:{x:20.5,z:4.5}}))});
  await expect(page.getByText('Partida importada.')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-score','scheduled');
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).first().click();
  await expect(page.locator('#hint')).toContainText('Cruzar · Santuario de las Raíces');
  await page.keyboard.press('e');
  await expect(page.locator('#location')).toHaveText('Santuario de las Raíces');
  await page.getByRole('button',{name:'Pausa',exact:true}).click();
  const [download]=await Promise.all([
    page.waitForEvent('download'),page.getByRole('button',{name:'Exportar partida',exact:true}).click()
  ]);
  expect(download.suggestedFilename()).toBe('eclipse-404-partida-1.json');
  const stream=await download.createReadStream();
  const chunks:Buffer[]=[];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  expect(JSON.parse(Buffer.concat(chunks).toString('utf8')).level).toBe('d0');
});

test('Catedral, pista de la campana y cambio de realidad desde una partida importada',async({page})=>{
  await page.goto('./');
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  const [picker]=await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button',{name:'Importar',exact:true}).first().click()
  ]);
  await picker.setFiles({name:'catedral.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({
    ...fresh(),level:'d1',position:{x:3.5,z:16.5},bosses:[0],tools:[0,1],tool:1
  }))});
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).first().click();
  await expect(page.locator('#location')).toHaveText('Catedral Sumergida');
  await expect(page.locator('#hint')).toContainText('Campana del embarcadero');
  await press(page,'e');
  await expect(page.getByRole('dialog').getByText(/Llevad a los niños primero/)).toBeVisible();
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).click();
  await press(page,'r');
  await press(page,'e');
  await expect(page.getByRole('dialog').getByText(/una cuerda invisible/)).toBeVisible();
});

test('selección de armas guardada y entrada automática al Santuario',async({page})=>{
  await page.goto('./');
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  const [picker]=await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button',{name:'Importar',exact:true}).first().click()
  ]);
  await picker.setFiles({name:'arsenal.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({
    ...fresh(),position:{x:19.35,z:4.5},foundWeapons:[0,1],weaponStyle:0
  }))});
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).first().click();
  await page.getByRole('button',{name:'Pausa',exact:true}).click();
  await page.getByRole('button',{name:'Inventario y equipo'}).click();
  await page.getByRole('button',{name:/Mandoble de la Campana/}).click();
  await expect(page.getByRole('button',{name:/Mandoble de la Campana/})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Volver',exact:true}).click();
  await page.getByRole('button',{name:'Volver al juego'}).click();
  await page.keyboard.down('d');
  await expect(page.locator('#location')).toHaveText('Santuario de las Raíces');
  await page.keyboard.up('d');
  await page.reload();
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Continuar',exact:true}).first().click();
  await expect(page.locator('#quickbar')).toContainText('Mandoble de la Campana');
});
