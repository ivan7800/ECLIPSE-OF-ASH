import * as THREE from 'three';
import type { EnemyStyle } from '../data/catalog';

export function random(seed:number) {
  return () => {
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    return seed/4294967296;
  };
}
function canvas(w:number,h:number) {
  const image=document.createElement('canvas');
  image.width=w;image.height=h;
  const ctx=image.getContext('2d')!;
  ctx.imageSmoothingEnabled=false;
  return {image,ctx};
}
function texture(image:HTMLCanvasElement) {
  const tex=new THREE.CanvasTexture(image);
  tex.magFilter=THREE.NearestFilter;
  tex.minFilter=THREE.NearestMipmapLinearFilter;
  tex.colorSpace=THREE.SRGBColorSpace;
  return tex;
}

export function stone(base:string,pattern:'earth'|'brick'|'water'|'metal'|'wood',seed:number) {
  const {image,ctx}=canvas(64,64);
  const rng=random(seed);
  ctx.fillStyle=base;ctx.fillRect(0,0,64,64);
  if (pattern==='brick'||pattern==='metal') {
    for (let y=-1;y<64;y+=13) for (let x=-18;x<64;x+=20) {
      const xx=x+(y%2===0?0:10), yy=y;
      ctx.fillStyle='rgba(5,5,9,.55)';ctx.fillRect(xx,yy,20,13);
      ctx.fillStyle=base;ctx.fillRect(xx+1,yy+1,18,11);
      ctx.fillStyle='rgba(220,210,185,.19)';ctx.fillRect(xx+2,yy+2,15,1);
      ctx.fillStyle='rgba(5,5,9,.18)';ctx.fillRect(xx+3,yy+10,14,1);
    }
  }
  for (let i=0;i<1050;i++) {
    const x=Math.floor(rng()*64),y=Math.floor(rng()*64);
    const light=rng()>.48, alpha=pattern==='water'?.24:.20;
    ctx.fillStyle=light ? 'rgba(234,220,166,'+(rng()*alpha)+')' : 'rgba(0,0,12,'+(rng()*alpha*1.7)+')';
    ctx.fillRect(x,y,1+Math.floor(rng()*(pattern==='water'?9:4)),pattern==='wood'?4:1+Math.floor(rng()*2));
  }
  if (pattern==='earth') for (let i=0;i<26;i++) {
    const x=Math.floor(rng()*63),y=Math.floor(rng()*63);
    ctx.fillStyle=i%2?'#3a4232':'#495044';
    ctx.fillRect(x,y,2,2);ctx.fillRect(x-1,y+2,4,2);ctx.fillRect(x,y+4,2,1);
  }
  const tex=texture(image);
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  return tex;
}

export function glow() {
  const {image,ctx}=canvas(48,48);
  const g=ctx.createRadialGradient(24,24,0,24,24,24);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.20,'rgba(255,255,255,.72)');
  g.addColorStop(.52,'rgba(255,255,255,.18)');g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,48,48);
  return texture(image);
}

type Style=EnemyStyle|'hero'|'npc'|'tree'|'chest'|'torch'|'rune'|'altar'|'fern'|'reed'|'crystal';
const size=48, frames=4, directions=8;

function shape(ctx:CanvasRenderingContext2D,color:string,points:number[]) {
  ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(points[0],points[1]);
  for(let i=2;i<points.length;i+=2) ctx.lineTo(points[i],points[i+1]);
  ctx.closePath();ctx.fill();
}
function rect(ctx:CanvasRenderingContext2D,color:string,x:number,y:number,w:number,h:number) {
  ctx.fillStyle=color;ctx.fillRect(x,y,w,h);
}
function human(ctx:CanvasRenderingContext2D,hue:string,step:number,dir:number,style:Style) {
  const bob=step===0?0:step<0?1:0;
  const stride=step===0?0:step<0?2:-2;
  const side=dir>=1&&dir<=3?1:dir>=5?-1:0;
  const back=dir>=3&&dir<=5;
  const hero=style==='hero', knight=style==='knight';
  const hood=hero?'#b95745':knight?hue:'#897074';
  const outline='#11131b';
  shape(ctx,outline,[15,13-bob,20,8-bob,28,8-bob,33,16-bob,31,22-bob,34,28-bob,36,42,27,45,14,42,11,44,13,28,17,22]);
  if (hero) shape(ctx,'#171921',[13,24-bob,19,27-bob,26,25-bob,32,22-bob,35,40,30,47,24,41,20,48,11,42]);
  shape(ctx,hero?'#332d38':knight?'#30333b':'#292a34',[15,23-bob,29,22-bob,33,31,34,40,22,43,13,41,14,34]);
  shape(ctx,hero?'#75414a':knight?'#454c58':'#45404f',[16,24-bob,29,23-bob,29,36,33,39,20,41,13,40,17,32]);
  if(hero){rect(ctx,'#a69583',17,27-bob,2,8);rect(ctx,'#a69583',28,26-bob,2,10);rect(ctx,'#b1a18f',19,33-bob,10,1);}
  rect(ctx,outline,16+stride,38-bob,7,8-Math.abs(stride));
  rect(ctx,outline,25-stride,38-bob,7,8-Math.abs(stride));
  rect(ctx,'#705447',18,42-(step>0?1:0),4,3);rect(ctx,'#705447',26,43-(step<0?1:0),4,2);
  shape(ctx,hood,[16,14-bob,20,10-bob,27,9-bob,32,15-bob,30,21-bob,25,25-bob,18,22-bob]);
  shape(ctx,hero?'#dc8665':hue,[18,14-bob,21,11-bob,27,11-bob,29,13-bob,23,14-bob,20,19-bob,17,20-bob]);
  shape(ctx,back?hood:'#342831',[20+side*2,15-bob,27+side*2,14-bob,29+side,17-bob,27+side,22-bob,22+side,22-bob]);
  if (!back) {
    rect(ctx,knight?hue:'#d9ab84',22+side*2,17-bob,5,4);
    rect(ctx,knight?'#e7f6f3':'#32212a',23+side*3,17-bob,2,1);
    if (!knight) rect(ctx,'#d6c08b',25+side*2,20-bob,2,1);
  } else rect(ctx,'#d09b73',22,23-bob,4,1);
  rect(ctx,'#b88c55',19,31-bob,10,2);rect(ctx,'#e2c087',24,30-bob,3,3);
  rect(ctx,'#22242c',18,28-bob,5,3);rect(ctx,'#d09268',18,29-bob,3,2);
  if (style==='npc') return;
  const hand=side===-1?11:33;
  rect(ctx,'#d9b781',hand,30-bob,3,4);
  shape(ctx,outline,[hand-1,30-bob,hand+3,31-bob,hand+8,21-bob,hand+8,16-bob,hand+4,19-bob]);
  shape(ctx,'#d0d8c9',[hand,30-bob,hand+3,29-bob,hand+7,20-bob,hand+7,17-bob,hand+4,20-bob]);
  rect(ctx,'#b5915f',hand-1,30-bob,5,1);
}

function creature(ctx:CanvasRenderingContext2D,style:Style,hue:string,step:number,dir:number,boss:boolean) {
  const bob=Math.abs(step)%2;
  const dark='#262331', outline='#151520', shine='#ffdfab';
  if (style==='fang') {
    shape(ctx,outline,[3,25,12,23,18,20,28,21,34,15-bob,39,18-bob,44,25,45,32,41,36,36,35,35,44,29,44,29,36,19,37,17,44,12,44,13,34,7,32]);
    shape(ctx,dark,[5,26,15,24,21,23,29,25,35,18-bob,41,22,42,31,38,34,29,32,23,35,13,33]);
    shape(ctx,hue,[14,25,21,23,29,24,33,21,38,21,40,24,33,25,31,30,24,30,22,28,19,31,15,30]);
    rect(ctx,shine,37,24,3,2);rect(ctx,'#bd7766',13,39+step,3,5);rect(ctx,'#bd7766',30,38-step,3,5);
    if (boss) {
      shape(ctx,hue,[35,20,31,13,31,8,27,5,28,3,33,7,34,13,37,16,40,12,41,6,45,3,46,5,43,9,43,15,39,21]);
      rect(ctx,shine,33,12,3,1);rect(ctx,shine,41,9,2,2);
    }
    return;
  }
  if (style==='crawler') {
    for (let i=0;i<4;i++) {
      const y=26+i*3, offset=(i+step)%2;
      shape(ctx,dark,[15,y,6-i+offset,y-2,2+i,y+2,4+i,y+4,8,y,16,y+4]);
      shape(ctx,dark,[33,y,42+i-offset,y-2,46-i,y+2,44-i,y+4,40,y,32,y+4]);
    }
    shape(ctx,outline,[9,27,16,21-bob,30,20-bob,39,27,38,36,29,41,18,40,11,34]);
    shape(ctx,hue,[13,27,20,22-bob,29,22-bob,36,26,30,33,21,35,14,31]);
    shape(ctx,'#684656',[17,29,22,23,26,25,24,32,28,34,21,36]);
    rect(ctx,shine,19,34,3,2);rect(ctx,shine,28,33,3,2);
    return;
  }
  if (style==='automaton') {
    shape(ctx,outline,[11,17,19,13,19,9,29,9,31,13,37,16,41,34,34,38,32,44,25,44,24,39,21,44,13,44,11,35,7,32]);
    shape(ctx,dark,[14,21,21,16,32,17,35,29,30,39,17,39,12,30]);
    rect(ctx,hue,20,11,9,10);rect(ctx,'#6b4e45',21,13,6,5);rect(ctx,shine,22,15,5,2);
    shape(ctx,hue,[14,24,22,20,31,22,33,31,26,36,17,33]);
    rect(ctx,'#34323e',20,24,8,7);rect(ctx,shine,23,26,3,3);
    rect(ctx,hue,8,29-bob,5,6);rect(ctx,hue,35,28+bob,5,6);
    rect(ctx,'#946b52',15,40,5,3);rect(ctx,'#946b52',26,40,5,3);
    if (boss) shape(ctx,shine,[8,19,4,12,8,5,11,8,10,15,14,19]);
    return;
  }
  const y=23-bob+(step===0?0:1);
  if (style==='wisp' || style==='mask') {
    shape(ctx,outline,[11,y-4,15,y-13,23,y-17,32,y-13,38,y-3,35,y+7,32,y+13,38,y+18,29,y+16,25,y+22,19,y+14,11,y+18,14,y+9]);
    shape(ctx,hue,[14,y-4,18,y-11,24,y-14,30,y-10,35,y-3,32,y+7,32,y+12,27,y+10,24,y+17,20,y+10,14,y+13,17,y+5]);
    shape(ctx,'#65516c',[16,y-1,24,y-8,32,y-1,29,y+4,27,y+9,20,y+6]);
    shape(ctx,style==='mask'?'#eac2ac':hue,[18,y-3,23,y-7,29,y-4,29,y+2,25,y+6,20,y+3]);
    rect(ctx,outline,20,y-2,2,2);rect(ctx,outline,26,y-2,2,2);rect(ctx,shine,23,y+1,2,1);
    if (boss) shape(ctx,shine,[14,y-11,14,y-20,20,y-15,23,y-23,28,y-15,33,y-21,33,y-11]);
    return;
  }
  shape(ctx,outline,[4,y,11,y-5,11,y-11,20,y-12,24,y-20,29,y-12,37,y-11,38,y-5,45,y,37,y+6,36,y+12,29,y+11,24,y+20,20,y+11,12,y+12,10,y+5]);
  shape(ctx,hue,[7,y,17,y-4,14,y-9,21,y-8,24,y-16,28,y-8,34,y-9,32,y-4,41,y,31,y+5,34,y+8,27,y+8,24,y+15,20,y+7,14,y+9,17,y+4]);
  shape(ctx,'#564661',[13,y,19,y-5,28,y-6,35,y,28,y+6,20,y+6]);
  rect(ctx,'#dbbcc5',19,y-3,10,6);rect(ctx,shine,21,y-2,6,4);rect(ctx,'#2b2637',23+dir%3,y-3,2,6);
}

function prop(ctx:CanvasRenderingContext2D,style:Style,hue:string,frame:number) {
  if (style==='tree') {
    const rng=random(8271);
    shape(ctx,'#242828',[19,47,22,34,18,27,20,18,26,19,26,33,31,46,28,47,25,43,24,47]);
    shape(ctx,'#686044',[21,45,23,34,21,28,24,26,25,37,27,43,26,46,24,42,23,46]);
    shape(ctx,'#182b26',[5,23,8,16,7,12,13,8,15,3,23,3,25,1,32,6,38,8,39,15,44,20,40,28,35,30,30,34,25,32,20,35,15,32,9,31,7,27]);
    for(let i=0;i<105;i++) {
      const x=Math.round(24+(rng()-.5)*35),y=Math.round(17+(rng()-.5)*30);
      if (((x-24)/19)**2+((y-17)/16)**2>1) continue;
      rect(ctx,['#203c32','#3c5038','#526241','#6d704b','#2e4438',hue][i%6],x,y,2+Math.floor(rng()*5),1+Math.floor(rng()*4));
    }
    return;
  }
  if (style==='fern'||style==='reed') {
    const rng=random(style==='fern'?183:96);
    for(let i=0;i<11;i++){
      const tip=Math.round(5+rng()*39),y=15+Math.round(rng()*23);
      shape(ctx,i%3===0?hue:i%2?'#627653':'#354f45',[22+i%5,47,tip-2,y+3,tip,y,tip+3,y+8,25+i%6,47]);
    }
    return;
  }
  if (style==='crystal') {
    for(const [x,y] of [[10,23],[20,12],[29,5],[34,24]]) {
      shape(ctx,'#2e3547',[x-4,46,x-3,y+9,x+2,y,x+6,y+7,x+7,46]);
      shape(ctx,hue,[x-2,y+9,x+2,y+1,x+3,y+9,x+2,41,x,45]);
      rect(ctx,'#c5ceda',x+1,y+9,1,7);
    }
    return;
  }
  if (style==='chest') {
    shape(ctx,'#171923',[8,33,13,26,34,26,39,32,39,44,8,44]);
    rect(ctx,'#533849',10,33,27,9);rect(ctx,'#8c5f4b',11,34,25,2);
    shape(ctx,'#ad7959',[10,32,14,27,33,27,37,32]);
    rect(ctx,'#b99562',14,29,3,13);rect(ctx,'#b99562',31,29,3,13);
    rect(ctx,'#e0b97d',22,33,5,5);rect(ctx,'#503849',24,34,1,3);
    return;
  }
  if (style==='torch') {
    rect(ctx,'#312937',21,29,6,18);rect(ctx,'#857063',23,30,2,16);
    shape(ctx,'#6d5557',[15,24,33,24,29,31,20,31]);
    shape(ctx,'#a04438',[17,25,15,19,20,15-frame,22,7+frame,26,16,29,13,33,22,29,27]);
    shape(ctx,'#f19b53',[20,25,19,19,24,11+frame,26,19,29,17,30,24,26,27]);
    shape(ctx,'#ffe0a0',[22,25,22,20,25,16,28,24,26,27]);
    return;
  }
  const altar=style==='altar';
  shape(ctx,'#232837',[10,46,12,39,16,39,16,20,24,13,32,20,32,39,37,40,39,46]);
  shape(ctx,'#675f64',[14,43,19,40,19,23,24,17,29,22,29,40,34,42,34,45,14,45]);
  shape(ctx,hue,[24,22,29,27,24,34,19,28]);
  shape(ctx,'#382c40',[24,24,27,28,24,31,21,28]);
  if (altar) {rect(ctx,hue,15,40,19,2);rect(ctx,'#e7bf89',22,25,4,3);}
}

const atlases=new Map<string,THREE.Texture>();
export function spriteAtlas(style:Style,hue:string,boss=false) {
  const key=style+hue+boss;
  let atlas=atlases.get(key);
  if (atlas) return atlas;
  const {image,ctx}=canvas(size*frames,size*directions);
  for (let dir=0;dir<directions;dir++) for(let f=0;f<frames;f++) {
    const step=[0,-1,0,1][f];
    ctx.save();ctx.translate(f*size,dir*size);
    if (style==='hero'||style==='npc'||style==='knight') {
      human(ctx,hue,step,dir,style);
      if (boss) {
        shape(ctx,hue,[14,14,13,6,18,10,20,5,24,8,28,3,30,9,35,6,32,16]);
        rect(ctx,'#ece0aa',21,12,8,1);
      }
    } else if (['fang','wisp','eye','crawler','automaton','mask','star'].includes(style)) {
      if (dir>4) {ctx.translate(size,0);ctx.scale(-1,1);}
      creature(ctx,style,hue,step,dir,boss);
    } else prop(ctx,style,hue,f);
    ctx.restore();
  }
  atlas=texture(image);atlases.set(key,atlas);
  return atlas;
}

export function spriteUV(geometry:THREE.PlaneGeometry,frame:number,dir:number) {
  const uv=geometry.attributes.uv;
  const u0=(frame+.02)/frames,u1=(frame+.98)/frames,v0=1-(dir+.98)/directions,v1=1-(dir+.02)/directions;
  uv.setXY(0,u0,v1);uv.setXY(1,u1,v1);uv.setXY(2,u0,v0);uv.setXY(3,u1,v0);
  uv.needsUpdate=true;
}
