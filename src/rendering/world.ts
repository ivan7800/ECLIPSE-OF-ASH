import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { biomes } from '../data/catalog';
import { targetPoint, tile } from '../data/levels';
import type { Game } from '../core/game';
import { glow, random, spriteAtlas, spriteUV, stone } from './art';

export type Billboard=T.Mesh<T.PlaneGeometry,T.MeshBasicMaterial>;
export function billboard(style:Parameters<typeof spriteAtlas>[0],hue:string,size:number,boss=false) {
  const mesh=new T.Mesh(new T.PlaneGeometry(size,size),new T.MeshBasicMaterial({
    map:spriteAtlas(style,hue,boss), transparent:false, alphaTest:.48, color:0xfff4e6, side:T.DoubleSide
  }));
  mesh.userData.size=size;
  spriteUV(mesh.geometry,0,0);
  return mesh;
}

const worldGlow=()=>glow();
function ring(radius:number,color:number,opacity:number) {
  const mesh=new T.Mesh(new T.RingGeometry(radius*.9,radius,32),
    new T.MeshBasicMaterial({color,transparent:true,opacity,side:T.DoubleSide,depthWrite:false}));
  mesh.rotation.x=-Math.PI/2;
  return mesh;
}
const hueString=(value:number)=>'#'+value.toString(16).padStart(6,'0');

export class WorldView {
  group=new T.Group();
  faces:Billboard[]=[];
  torches:Billboard[]=[];
  private trees:Billboard[]=[];
  lights:T.PointLight[]=[];
  waters:T.Texture[]=[];
  dust:T.Points<T.BufferGeometry,T.PointsMaterial>;
  private textures:T.Texture[]=[];
  private ownAtlasGlow=worldGlow();
  private rng:()=>number;

  constructor(private game:Game) {
    const {level,state}=game;
    const {width,height,biome,dungeon}=level;
    const spec=biomes[biome], shadow=state.realm===1;
    const trim=shadow ? 0xa491dd : spec.trim;
    const tint=hueString(trim);
    this.rng=random(47+level.index*237+(dungeon?4000:0));
    const make=(color:string,type:Parameters<typeof stone>[1],seed:number)=>{
      const tex=stone(color,type,seed);this.textures.push(tex);return tex;
    };
    const dirt=new T.MeshStandardMaterial({map:make(shadow?'#403650':spec.ground,'earth',7),roughness:1});
    const pavement=new T.MeshStandardMaterial({map:make(shadow?'#55465f':spec.floor,'brick',239),roughness:.95});
    const stoneMat=new T.MeshStandardMaterial({map:make(shadow?'#4d435e':'#48464a','brick',125),roughness:1});
    const rim=new T.MeshStandardMaterial({map:make(shadow?'#625671':'#68605b','brick',57),roughness:1});
    const metal=new T.MeshStandardMaterial({color:0x4b3943,roughness:.79,map:make('#bca194','metal',27)});
    const gold=new T.MeshStandardMaterial({color:0x9c794e,roughness:.55,metalness:.45});
    const wood=new T.MeshStandardMaterial({map:make('#735447','wood',23),roughness:1});
    const waterTex=make(shadow?'#35315c':'#34565c','water',149);
    const water=new T.MeshStandardMaterial({map:waterTex,color:shadow?0xa8a0f9:0x95c6cb,roughness:.28,metalness:.4,emissive:shadow?0x201134:0x102733,emissiveIntensity:.4});
    this.waters.push(waterTex);
    const voidMat=new T.MeshStandardMaterial({color:shadow?0x252334:0x232c29,roughness:1});
    const base=new T.Mesh(new T.PlaneGeometry(width+100,height+100),voidMat);
    base.rotation.x=-Math.PI/2;base.position.set(width/2,-.22,height/2);this.group.add(base);

    const layers=new Map<T.Material,{x:number;z:number}[]>([[dirt,[]],[pavement,[]],[water,[]]]);
    for(let z=0;z<height;z++) for(let x=0;x<width;x++){
      const key=tile(level,x,z,state.realm,game.gateOpen);
      const mainPath=dungeon ? key!=='#' : z===Math.floor(level.spawn.z) || (x>=8&&x<=13&&z>=height-4) || key==='A';
      const mat=key==='~' ? water : mainPath ? pavement : dirt;
      layers.get(mat)!.push({x,z});
      if(key==='~') {
        if(this.rng()<.24) this.face('reed',tint,x+this.rng(),z+.65,.55,0);
      } else if (level.cells[z][x]==='=' && shadow) {
        this.box(x+.5,.06,z+.5,.93,.11,.95,rim);
        this.sigil(x+.5,z+.5,.30,trim);
      } else if (level.cells[z][x]==='L') {
        if(game.gateOpen) {
          this.arch(x+.5,z+.17,stoneMat,rim,gold);
          this.sigil(x+.5,z+.5,.38,trim);
        } else {
          this.wall(x+.5,z+.5,stoneMat,rim,true,shadow);
          this.face('rune',tint,x+.5,z+.90,.80,0);
        }
      } else if (key==='#') {
        const border=x===0||x===width-1||z===0||z===height-1;
        if (!dungeon && border && ['forest','garden','marsh','plain','village'].includes(biome)) {
          if (this.rng()<.71) this.tree(x+.45+this.rng()*.32,z+.5,2.4+this.rng()*2.2,tint,wood);
          else this.rock(x+.5,z+.5,.45+this.rng()*.4,stoneMat);
        } else if (dungeon || !border) {
          this.wall(x+.5,z+.5,stoneMat,rim,dungeon,shadow);
        } else if(this.rng()<.6) {
          this.rock(x+.5,z+.5,.6+this.rng()*.7,stoneMat);
          if (this.rng()<.28) this.face('crystal',tint,x+.6,z+.5,1.2,0);
        }
      } else if (key==='T') {
        if(!dungeon && ['forest','garden','plain','village'].includes(biome)) this.tree(x+.52,z+.5,2.25+this.rng()*1.7,tint,wood);
        else if (dungeon || biome==='city'||biome==='heart') this.pillar(x+.52,z+.5,rim,1.1+this.rng()*.66);
        else this.face(biome==='marsh'?'reed':'crystal',tint,x+.52,z+.5,1.05+this.rng(),0);
      } else if (key==='.' && this.rng()<.26) {
        const decoration=dungeon && this.rng()<.65 ? 'crystal' : 'fern';
        this.face(decoration,tint,x+.14+this.rng()*.73,z+.15+this.rng()*.7,.34+this.rng()*.48,0);
      }
    }
    for (const [mat,coords] of layers) {
      if (!coords.length) continue;
      const geom=new T.PlaneGeometry(1.004,1.004);
      geom.rotateX(-Math.PI/2);
      const mesh=new T.InstancedMesh(geom,mat,coords.length);
      const transform=new T.Matrix4();
      for(const [i,{x,z}] of coords.entries()){
        transform.makeTranslation(x+.5,mat===water?-.11:0,z+.5);
        mesh.setMatrixAt(i,transform);
        const shade=.84+this.rng()*.21;
        mesh.setColorAt(i,new T.Color(shade,shade,shade));
      }
      mesh.receiveShadow=true;
      this.group.add(mesh);
    }

    for (const item of level.objects) {
      if (!game.visible(item)) continue;
      const solved=!!state.flags[item.id];
      const at=targetPoint(level,item,solved);
      switch(item.kind){
        case 'npc':case 'merchant':case 'smith':
          this.face('npc',tint,item.x,item.z,1.27,0);
          this.sigil(item.x,item.z,.27,trim);
          break;
        case 'chest':case 'quest':case 'tool':
          if(!solved && (item.kind!=='tool'||!state.tools.includes(level.index))) {
            this.face('chest',tint,item.x,item.z,1.34,0);
            this.halo(item.x,.32,item.z,1.37,item.kind==='tool'?0xf4bd7b:trim,.18);
          }
          break;
        case 'inscription':
          this.pillar(item.x,item.z-.18,rim,1.05);
          this.face('rune',tint,item.x,item.z,.96,.24);
          this.sigil(item.x,item.z,.42,trim);
          break;
        case 'oath':
          this.pillar(item.x,item.z-.24,rim,1.25);
          this.face('rune',shadow?'#e0cdfd':'#eac39a',item.x,item.z+.04,.98,.34);
          this.sigil(item.x,item.z,.38,trim);
          break;
        case 'bell': {
          this.arch(item.x,item.z-.33,stoneMat,rim,gold);
          const bell=new T.Mesh(new T.CylinderGeometry(.17,.35,.55,12),gold);
          bell.position.set(item.x,1.02,item.z);bell.castShadow=true;this.group.add(bell);
          this.box(item.x,.68,item.z,.09,.19,.09,metal);
          this.sigil(item.x,item.z,.37,trim);
          break;
        }
        case 'key':
          if(!solved) {
            const key=new T.Mesh(new T.TorusGeometry(.13,.025,5,12),gold);
            key.position.set(item.x,.35,item.z);
            this.group.add(key);
            this.box(item.x,.2,item.z,.05,.30,.045,gold);
            this.sigil(item.x,item.z,.40,0xe4ae66);
          }
          break;
        case 'shrine':
          this.face('altar',tint,item.x,item.z,1.27,0);
          this.torch(item.x-.55,item.z+.12);
          break;
        case 'entrance':case 'next':case 'back':
          this.sigil(item.x,item.z,.53,trim);
          if(item.kind==='entrance' && state.bosses.includes(level.index)){
            this.halo(item.x,.38,item.z,1.8,0xe8b788,.26);
            this.face('crystal','#d1a980',item.x,item.z+.42,.72,0);
          }
          if(item.kind!=='back') {
            this.arch(item.x,item.z-.34,stoneMat,rim,gold);
            this.torch(item.x-.97,item.z+.14);
            this.torch(item.x+.97,item.z+.14);
          }
          break;
        case 'gate':
          if (!game.gateOpen) {
            for(let j=-2;j<=2;j++) this.box(item.x+j*.19,.77,item.z,.09,1.55,.14,metal);
            this.box(item.x,1.22,item.z,.96,.12,.19,gold);
            this.box(item.x,.46,item.z,.96,.10,.19,metal);
          } else this.sigil(item.x,item.z,.54,trim);
          break;
        case 'target':
          if (level.index===4) {
            this.sigil(item.x,item.z-.68,.43,trim);
            this.box(at.x,.35,at.z,.65,.7,.61,rim);
            this.box(at.x,.73,at.z,.53,.08,.51,stoneMat);
          } else this.face(level.index===3&&solved?'torch':level.index===5?'crystal':'rune',solved?'#ecc579':tint,at.x,at.z,1.18,0);
          this.sigil(at.x,at.z,.50,solved?0xe6ac65:trim);
          break;
        case 'boss':
          this.sigil(item.x,item.z,1.22,trim);
          this.sigil(item.x,item.z,.93,trim);
          break;
      }
    }
    if(level.id==='r0') {
      this.arch(3.6,6.1,stoneMat,rim,gold);
      this.torch(2.61,6.64);this.torch(4.63,6.64);
      this.sigil(3.6,8.48,.96,trim);
      this.sigil(3.6,8.48,.67,trim);
      this.pillar(6.56,5.6,rim,1.02);
      if(!state.flags['secret:r0']) {
        this.wall(19.5,2.5,stoneMat,rim,true,false);
        this.face('rune','#b37657',19.5,3.02,.82,.16);
      } else {
        this.sigil(19.5,2.5,.76,trim);
        this.face('crystal','#e2a477',19.5,2.5,1.29,0);
      }
    }
    if (level.biome==='village') {
      this.house(5.5,2,stoneMat,wood,rim);
      this.house(17.7,2.1,stoneMat,wood,rim);
      this.house(11.2,10.2,stoneMat,wood,rim);
    }
    this.landmark(stoneMat,rim,metal,wood,trim);
    if(level.id==='d7'){
      this.arch(15.5,12.34,stoneMat,rim,gold);
      this.arch(10.5,16.45,stoneMat,rim,gold);
      this.torch(9.05,17.28);this.torch(11.95,17.28);
    }
    if(level.id==='d1'){
      this.arch(10.5,12.6,stoneMat,rim,gold);
      this.torch(9.0,13.55);this.torch(12,13.55);
      this.arch(16.5,15.3,stoneMat,rim,gold);
    }
    if(dungeon) {
      this.torch(3.1,height-2);this.torch(width-3.1,height-2);
      this.torch(width/2-1.8,4.85);this.torch(width/2+1.8,4.85);
      this.torch(3.2,2.7);this.torch(width-3.2,2.7);
    }
    this.batchScenery();
    const positions=new Float32Array(205*3);
    for(let i=0;i<positions.length;i+=3) {
      positions[i]=this.rng()*(width+5)-2;
      positions[i+1]=.20+this.rng()*5;
      positions[i+2]=this.rng()*(height+4)-2;
    }
    const geometry=new T.BufferGeometry();
    geometry.setAttribute('position',new T.BufferAttribute(positions,3));
    this.dust=new T.Points(geometry,new T.PointsMaterial({color:trim,size:.065,map:this.ownAtlasGlow,transparent:true,opacity:.75,depthWrite:false,blending:T.AdditiveBlending}));
    this.group.add(this.dust);
  }

  private landmark(stone:T.Material,rim:T.Material,metal:T.Material,wood:T.Material,trim:number) {
    const {level,state}=this.game;
    const accent=hueString(trim);
    if(level.dungeon) {
      const boss=level.objects.find(item=>item.kind==='boss')!;
      const radius=level.index===7?1.42:1.03;
      for(const sign of [-1,1]){
        const x=boss.x+sign*2.65,z=boss.z-.78;
        if([0,3,4].includes(level.index)) this.pillar(x,z,rim,1.44);
        else this.face('crystal',accent,x,z,1.75,0);
        this.sigil(x,z,.49,trim);
      }
      this.sigil(boss.x,boss.z,radius,trim);
      return;
    }
    switch(level.biome) {
      case 'plain':case 'heart': {
        const x=level.biome==='plain'?12.3:13.8,z=3.3;
        const ruin=new T.Mesh(new T.TorusGeometry(1.2,.15,6,24,Math.PI*1.68),level.biome==='heart'?metal:rim);
        ruin.position.set(x,1.0,z);ruin.rotation.set(.26,.3,-.4);ruin.castShadow=true;
        this.group.add(ruin);
        this.sigil(x,z,1.24,trim);
        for(const sign of [-1,1]) this.rock(x+sign*1.19,z+.33,.67,stone);
        break;
      }
      case 'ash': {
        for(let i=0;i<3;i++){
          this.pillar(6.6+i*.57,2.1+i*.12,rim,1.15+i*.2);
          this.face('crystal',accent,6.3+i*.68,2.9,1.0,0);
        }
        break;
      }
      case 'marsh':
        for(let i=0;i<5;i++) this.box(5.1,.025,4.1+i*.31,1.02,.10,.25,wood);
        this.pillar(4.7,4.19,rim,.57);this.pillar(5.55,4.19,rim,.51);
        break;
      case 'coast':
        for(let i=0;i<5;i++) this.face('crystal',accent,1.3+i*.78,2.44+i*.21,1.3+(i%3)*.46,0);
        break;
      case 'city':
        this.house(4.3,2.55,stone,wood,rim);
        this.arch(8.5,2.55,stone,rim,metal);
        this.torch(8.1,3.2);
        break;
      case 'garden':
        this.box(12.8,.39,2.85,1.5,.72,.84,stone);
        for(let i=0;i<4;i++){
          const finger=this.box(12.24+i*.36,.84,2.77,.26,.88-i*.08,.27,rim);
          finger.rotation.z=.13*(1-i);
        }
        this.face('fern',accent,13.6,3.09,.96,0);
        break;
      case 'reverse':
        if(state.realm) for(let i=0;i<4;i++){
          const block=this.box(5+i*.72,1.65+i*.28,2.8,.52,.56,.65,rim);
          block.rotation.set(i*.26,i*.39,i*.18);
        }
        break;
    }
  }

  private batchScenery() {
    const buckets=new Map<string,{material:T.Material; cast:boolean; items:T.Mesh[]}>();
    for(const item of this.group.children){
      if(!(item instanceof T.Mesh) || item instanceof T.InstancedMesh || !(item.material instanceof T.MeshStandardMaterial)) continue;
      if(!item.geometry.index) continue;
      const key=item.material.uuid+item.castShadow;
      const bucket=buckets.get(key)??{material:item.material,cast:item.castShadow,items:[]};
      bucket.items.push(item);
      buckets.set(key,bucket);
    }
    for(const {material,cast,items} of buckets.values()){
      if(items.length<3) continue;
      const geometries=items.map(item=>{item.updateMatrix();return item.geometry.clone().applyMatrix4(item.matrix);});
      const geometry=mergeGeometries(geometries);
      for(const clone of geometries) clone.dispose();
      if(!geometry) continue;
      for(const item of items){this.group.remove(item);item.geometry.dispose();}
      const batch=new T.Mesh(geometry,material);
      batch.castShadow=cast;batch.receiveShadow=true;
      this.group.add(batch);
    }
  }

  private box(x:number,y:number,z:number,w:number,h:number,d:number,mat:T.Material) {
    const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),mat);
    mesh.position.set(x,y,z);mesh.castShadow=h>.4;mesh.receiveShadow=true;
    this.group.add(mesh);
    return mesh;
  }
  private face(style:Parameters<typeof spriteAtlas>[0],hue:string,x:number,z:number,size:number,y:number) {
    const mesh=billboard(style,hue,size);
    mesh.position.set(x,y+size*.42,z);this.group.add(mesh);this.faces.push(mesh);
    return mesh;
  }
  private tree(x:number,z:number,scale:number,tint:string,wood:T.Material) {
    this.box(x,.47,z,.19,.9,.16,wood);
    const tree=this.face('tree',tint,x,z,scale,0);
    tree.material.color.setScalar(.68+this.rng()*.26);
    tree.material.transparent=true;
    tree.material.depthWrite=false;
    tree.material.alphaTest=.12;
    this.trees.push(tree);
    this.halo(x,.025,z,scale*.62,0x090c12,.6,false);
  }
  private rock(x:number,z:number,scale:number,mat:T.Material) {
    const mesh=new T.Mesh(new T.DodecahedronGeometry(scale*.55),mat);
    mesh.scale.set(1,.62,.76);mesh.rotation.y=this.rng()*3;
    mesh.position.set(x,.17*scale,z);mesh.receiveShadow=true;this.group.add(mesh);
  }
  private wall(x:number,z:number,mat:T.Material,rim:T.Material,dungeon:boolean,shadow:boolean) {
    const h=dungeon?.60+this.rng()*.52:.87+this.rng()*.50;
    this.box(x,h*.5,z,1.01,h,1.01,mat);
    this.box(x,h,z,1.055,.14,1.055,rim);
    if (shadow && this.rng()<.17) this.face('crystal','#aa8de8',x,z,1.2,h*.8);
  }
  private pillar(x:number,z:number,mat:T.Material,h:number) {
    const mesh=new T.Mesh(new T.CylinderGeometry(.17,.23,h,8),mat);
    mesh.position.set(x,h*.5,z);mesh.castShadow=true;mesh.receiveShadow=true;this.group.add(mesh);
    this.box(x,.10,z,.65,.2,.62,mat);
    this.box(x,h,z,.45,.16,.44,mat);
    this.box(x,h+.13,z,.36,.10,.36,mat);
  }
  private arch(x:number,z:number,mat:T.Material,rim:T.Material,gold:T.Material) {
    this.pillar(x-.68,z,rim,1.25);this.pillar(x+.68,z,rim,1.25);
    for(let i=0;i<7;i++) {
      const a=.1+i*(Math.PI-.2)/6;
      const brick=this.box(x+Math.cos(a)*.68,1.27+Math.sin(a)*.76,z,.34,.28,.39,i%2?rim:mat);
      brick.rotation.z=a-Math.PI/2;
    }
    this.box(x,2.04,z,.20,.22,.45,gold);
  }
  private house(x:number,z:number,mat:T.Material,wood:T.Material,rim:T.Material) {
    this.box(x,.86,z,2.12,1.72,1.9,mat);
    for(const sign of [-1,1]) {
      const roof=this.box(x+sign*.60,1.96,z,1.41,.14,2.19,wood);
      roof.rotation.z=-sign*.48;
    }
    this.box(x,.58,z+1,.49,1.15,.1,wood);
    this.box(x+.69,1.10,z+1,.38,.41,.1,rim);
    this.halo(x+.69,1.1,z+1.09,.67,0xffaa65,.45);
    this.box(x-.63,2.04,z-.43,.28,.7,.29,mat);
  }
  private sigil(x:number,z:number,r:number,color:number) {
    const rune=ring(r,color,.61);
    rune.position.set(x,.033,z);this.group.add(rune);
    const second=ring(r*.68,color,.32);
    second.position.copy(rune.position);this.group.add(second);
    for(let i=0;i<4;i++) {
      const angle=Math.PI*i/2;
      const shape=new T.Mesh(new T.PlaneGeometry(.085,.16),new T.MeshBasicMaterial({color,side:T.DoubleSide,transparent:true,opacity:.75}));
      shape.rotation.x=-Math.PI/2;
      shape.position.set(x+Math.cos(angle)*r,.034,z+Math.sin(angle)*r);this.group.add(shape);
    }
  }
  private halo(x:number,y:number,z:number,size:number,color:number,opacity:number,vertical=true) {
    const mat=new T.MeshBasicMaterial({map:this.ownAtlasGlow,color,transparent:true,opacity,depthWrite:false,
      blending:vertical?T.AdditiveBlending:T.NormalBlending});
    const mesh=new T.Mesh(new T.PlaneGeometry(size,size),mat);
    mesh.position.set(x,y,z);
    if(!vertical) mesh.rotation.x=-Math.PI/2;
    else this.faces.push(mesh);
    this.group.add(mesh);
  }
  private torch(x:number,z:number) {
    this.torches.push(this.face('torch','#e7aa69',x,z,1.36,0));
    this.halo(x,.80,z,2.3,0xe99255,.30);
    if(this.lights.length<5){
      const light=new T.PointLight(0xffad6b,12,5.0,2);
      light.position.set(x,.90,z);
      this.lights.push(light);this.group.add(light);
    }
  }

  update(time:number,camera:T.Camera,reduced:boolean,quality:string) {
    for(const face of this.faces) face.quaternion.copy(camera.quaternion);
    for(const tree of this.trees){
      const dx=Math.abs(tree.position.x-this.game.point.x);
      const dz=tree.position.z-this.game.point.z;
      tree.material.opacity=dx<.77 && dz>.04 && dz<2.4?.24:1;
    }
    for(const [i,torch] of this.torches.entries()) spriteUV(torch.geometry,Math.floor(time*8+i)%4,0);
    for(const [i,light] of this.lights.entries()) light.intensity=quality==='low'?0:10.2+(reduced?0:Math.sin(time*5+i)*1.8);
    for(const tex of this.waters) tex.offset.set(time*.065,time*.034);
    this.dust.visible=!reduced&&quality!=='low';
    const ash=this.game.level.biome==='ash'||this.game.level.biome==='heart';
    const spray=this.game.level.biome==='coast'||this.game.level.biome==='marsh';
    this.dust.material.size=ash?.091:spray?.046:.065;
    this.dust.position.y=Math.sin(time*(spray?.92:.23))*(spray?.49:.27);
    this.dust.position.x=Math.sin(time*(ash?.37:.24))*(ash?.86:.37);
  }
  dispose() {
    const materials=new Set<T.Material>();
    this.group.traverse(obj=>{
      if(obj instanceof T.Mesh||obj instanceof T.Points) {
        obj.geometry.dispose();
        if(Array.isArray(obj.material)) for (const mat of obj.material) materials.add(mat);
        else materials.add(obj.material);
      }
    });
    for(const material of materials) material.dispose();
    for(const tex of this.textures) tex.dispose();
    this.ownAtlasGlow.dispose();
  }
}
