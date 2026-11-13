import * as T from 'three';
import type { Actor, Event, FxKind, Game } from '../core/game';
import { biomes } from '../data/catalog';
import type { Point } from '../data/levels';
import { tile } from '../data/levels';
import { glow, spriteUV } from './art';
import { slashRotation } from './combat-effects';
import { billboard, WorldView, type Billboard } from './world';

export type Quality='low'|'medium'|'high';
type Fx={ object:T.Mesh<T.BufferGeometry,T.MeshBasicMaterial>; time:number; max:number; kind:FxKind; text?:HTMLSpanElement; point:Point; beam?:boolean };
interface RenderActor { sprite:Billboard; shadow:T.Mesh; warning:T.Mesh<T.RingGeometry,T.MeshBasicMaterial>; bar:T.Mesh; health:T.Mesh }

export class View {
  private renderer:T.WebGLRenderer;
  private scene=new T.Scene();
  private camera=new T.OrthographicCamera();
  private world:WorldView|null=null;
  private key='';
  private focus=new T.Vector3();
  private light=new T.DirectionalLight(0xffdcaa,2.23);
  private fill=new T.HemisphereLight(0xb7cddf,0x543f42,2.12);
  private heroLight=new T.PointLight(0xffb66f,5.2,6.2,2);
  private heroAura:T.Mesh<T.PlaneGeometry,T.MeshBasicMaterial>;
  private entities=new T.Group();
  private effects=new T.Group();
  private actorSprites=new Map<string,RenderActor>();
  private hero=billboard('hero','#d78c6a',1.50);
  private heroShadow:T.Mesh;
  private shadowTexture=glow();
  private projectiles:T.InstancedMesh;
  private bombMarker:T.Mesh;
  private transform=new T.Matrix4();
  private fx:Fx[]=[];
  private width=1;
  private height=1;
  private quality:Quality='high';
  private reduced=false;
  private lastKey='';
  private dirty=false;
  private observer:ResizeObserver;

  constructor(private canvas:HTMLCanvasElement,private numbers:HTMLElement) {
    this.renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=T.SRGBColorSpace;
    this.renderer.toneMapping=T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.12;
    this.light.position.set(-7,13,-4);
    this.light.castShadow=true;
    this.light.shadow.camera.left=-14;
    this.light.shadow.camera.right=14;
    this.light.shadow.camera.top=11;
    this.light.shadow.camera.bottom=-11;
    this.light.shadow.camera.far=45;
    this.light.shadow.bias=-.001;
    this.light.shadow.normalBias=.018;
    this.light.shadow.mapSize.set(1024,1024);
    this.heroLight.position.set(0,1,0);
    this.heroLight.castShadow=false;
    this.heroAura=new T.Mesh(new T.PlaneGeometry(3.8,3.8),new T.MeshBasicMaterial({
      map:this.shadowTexture,color:0xf3a451,transparent:true,opacity:.25,depthWrite:false,
      blending:T.AdditiveBlending,toneMapped:false
    }));
    this.heroAura.rotation.x=-Math.PI/2;
    this.heroAura.position.y=.018;
    this.heroShadow=this.shadow(1.10);
    this.scene.add(this.fill,this.light,this.light.target,this.heroLight,this.heroAura,this.entities,this.effects);
    this.entities.add(this.hero,this.heroShadow);
    this.projectiles=new T.InstancedMesh(new T.IcosahedronGeometry(.115,1),
      new T.MeshBasicMaterial({color:0xffb78c}),120);
    this.projectiles.frustumCulled=false;
    this.projectiles.count=0;
    this.effects.add(this.projectiles);
    this.bombMarker=new T.Mesh(new T.DodecahedronGeometry(.15),new T.MeshBasicMaterial({color:0xe29b61}));
    this.bombMarker.visible=false;
    this.effects.add(this.bombMarker);
    this.observer=new ResizeObserver(()=>this.resize());
    this.observer.observe(canvas);
    this.settings('high',false);
  }

  settings(quality:Quality,reduced:boolean) {
    this.quality=quality;this.reduced=reduced;
    this.renderer.shadowMap.enabled=quality==='high';
    this.renderer.shadowMap.type=T.PCFShadowMap;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,quality==='high'?1.65:quality==='medium'?1.2:.85));
    this.resize();
  }

  private resize() {
    this.width=Math.max(this.canvas.clientWidth,1);
    this.height=Math.max(this.canvas.clientHeight,1);
    const aspect=this.width/this.height;
    const h=aspect<.85?Math.max(8.8,5.65/aspect):8.1;
    this.camera.left=-h*aspect*.5;this.camera.right=h*aspect*.5;
    this.camera.top=h*.5;this.camera.bottom=-h*.5;
    this.camera.near=.1;this.camera.far=88;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width,this.height,false);
  }

  private shadow(size:number) {
    const mesh=new T.Mesh(new T.PlaneGeometry(size,size*.77),new T.MeshBasicMaterial({
      map:this.shadowTexture,color:0x151320,transparent:true,opacity:.75,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2
    }));
    mesh.rotation.x=-Math.PI/2;
    return mesh;
  }

  private rebuild(game:Game) {
    const key=game.level.id+':'+game.state.realm;
    this.lastKey=this.key;
    this.key=key;
    this.dirty=false;
    if(this.world) {this.scene.remove(this.world.group);this.world.dispose();}
    this.world=new WorldView(game);
    this.scene.add(this.world.group);
    if(key!==this.lastKey) {
      for(const actor of this.actorSprites.values()) {
        for(const mesh of Object.values(actor)) {
          this.entities.remove(mesh);
          mesh.geometry.dispose();
          (mesh.material as T.Material).dispose();
        }
      }
      this.actorSprites.clear();
      if(key.split(':')[0]!==this.lastKey.split(':')[0]) this.focus.set(game.point.x,0,game.point.z-.35);
    }
    const spec=biomes[game.level.biome];
    const fog=game.state.realm ? 0x241c35 : spec.fog;
    this.scene.background=new T.Color(fog);
    this.scene.fog=new T.FogExp2(fog,game.level.dungeon?.041:.037);
    this.fill.color.set(game.state.realm?0xb8a5f6:0xb5c7da);
    this.fill.groundColor.set(game.state.realm?0x4a365c:0x615045);
    this.light.color.set(game.state.realm?0xc4a8fc:0xffdfa9);
    this.light.position.set(game.level.width/2-7,13,game.level.height/2-4);
    this.light.target.position.set(game.level.width/2,0,game.level.height/2);
  }

  private makeActor(actor:Actor):RenderActor {
    const size=actor.spec.boss?2.78:actor.spec.style==='fang'?1.52:1.38;
    const sprite=billboard(actor.spec.style,actor.spec.hue,size,!!actor.spec.boss);
    const shadow=this.shadow(size*.69);
    const warning=new T.Mesh(new T.RingGeometry(.47,.52,24),new T.MeshBasicMaterial({
      color:0xf5ad73,side:T.DoubleSide,transparent:true,opacity:.74,depthWrite:false
    }));
    warning.rotation.x=-Math.PI/2;
    const bar=new T.Mesh(new T.PlaneGeometry(.62,.055),new T.MeshBasicMaterial({color:0x28242e}));
    const health=new T.Mesh(new T.PlaneGeometry(.62,.045),new T.MeshBasicMaterial({color:0xebaa84}));
    this.entities.add(sprite,shadow,warning,bar,health);
    const entry={sprite,shadow,warning,bar,health};
    this.actorSprites.set(actor.id,entry);
    return entry;
  }

  private place(mesh:Billboard,point:Point,dir:Point,moving:boolean,time:number,lift=0,rate=10) {
    const size=mesh.userData.size as number;
    const frame=moving?Math.floor(time*rate)%4:0;
    const direction=(Math.round(Math.atan2(dir.x,dir.z)*4/Math.PI)+8)%8;
    spriteUV(mesh.geometry,frame,direction);
    mesh.position.set(point.x,size*.438+lift,point.z);
    mesh.quaternion.copy(this.camera.quaternion);
  }

  event(event:Event) {
    if (event.type==='level') {this.key='';for(const fx of [...this.fx]) this.removeFx(fx);return;}
    if (event.type!=='fx') return;
    if (['gate','chest','shift','boss'].includes(event.kind)) {
      this.dirty=true;
    }
    if (event.kind==='shift') for(const fx of [...this.fx]) this.removeFx(fx);
    if (['step','warning','notice'].includes(event.kind)) return;
    if(event.from) {
      const dx=event.point.x-event.from.x,dz=event.point.z-event.from.z;
      const beam=new T.Mesh(new T.PlaneGeometry(Math.hypot(dx,dz),.065),new T.MeshBasicMaterial({
        color:0xf6c792,transparent:true,opacity:.8,blending:T.AdditiveBlending,side:T.DoubleSide,depthWrite:false
      }));
      beam.rotation.x=-Math.PI/2;
      beam.rotation.z=Math.atan2(-dz,dx);
      beam.position.set((event.point.x+event.from.x)/2,.43,(event.point.z+event.from.z)/2);
      this.effects.add(beam);
      this.fx.push({object:beam,time:.21,max:.21,kind:event.kind,point:event.point,beam:true});
    }
    const shade:Partial<Record<FxKind,number>>={hit:0xffb78f,dodge:0xbdc7dc,shift:0xc4a0fc,heal:0xa5e5ac,tool:0xf5cd8c,block:0xb5d8f2,bomb:0xf39562};
    const radius=event.kind==='bomb'?2.35:event.kind==='shift'?1.75:event.weaponStyle===2?1.32:event.weaponStyle===3?1.12:event.kind==='charge'?1.01:event.kind==='slash'?.84:.44;
    const arc=event.kind==='slash'||event.kind==='charge';
    const geometry=new T.RingGeometry(radius*(event.weaponStyle===2?.72:.80),radius,32,1,0,arc?(event.weaponStyle===2?.32:event.weaponStyle===3?Math.PI*1.5:Math.PI*1.21):Math.PI*2);
    const material=new T.MeshBasicMaterial({color:event.weaponStyle===3?0xc6a3ff:event.weaponStyle===1?0xeb9973:shade[event.kind]??0xffd9a2,transparent:true,opacity:.81,side:T.DoubleSide,
      depthWrite:false,blending:T.AdditiveBlending});
    const object=new T.Mesh(geometry,material);
    object.rotation.x=-Math.PI/2;
    if(arc && event.facing) object.rotation.copy(slashRotation(event.facing));
    object.position.set(event.point.x,.11,event.point.z);
    this.effects.add(object);
    const max=arc?.19:event.kind==='hit'?.49:.66;
    const fx:Fx={object,time:max,max,kind:event.kind,point:event.point};
    if(event.text && !this.reduced){
      fx.text=document.createElement('span');
      fx.text.textContent=event.text;this.numbers.append(fx.text);
    }
    this.fx.push(fx);
  }

  private removeFx(fx:Fx) {
    fx.text?.remove();
    this.effects.remove(fx.object);
    fx.object.geometry.dispose();fx.object.material.dispose();
    this.fx=this.fx.filter(item=>item!==fx);
  }

  render(game:Game,alpha:number,dt:number,time:number,menu=false) {
    const desired=game.level.id+':'+game.state.realm;
    if(this.key!==desired||this.dirty) this.rebuild(game);
    const x=T.MathUtils.lerp(game.previous.x,game.point.x,alpha);
    const z=T.MathUtils.lerp(game.previous.z,game.point.z,alpha);
    const cameraTarget=new T.Vector3(x,0,z-.42);
    if(menu) cameraTarget.set(7.2+Math.sin(time*.14)*.34,0,7.05);
    this.focus.lerp(cameraTarget,1-Math.exp(-dt*(this.reduced?22:7)));
    this.camera.position.set(this.focus.x+.0,this.focus.y+13.2,this.focus.z+13.8);
    this.camera.lookAt(this.focus);
    this.camera.updateMatrixWorld();
    this.world!.update(time,this.camera,this.reduced,this.quality);
    const swims=tile(game.level,x,z,game.state.realm)==='~';
    const gait=game.movementSpeed>8?17:game.movementSpeed>5.55?14:10;
    this.place(this.hero,{x,z},game.facing,game.moving,time,swims?-.20:0,gait);
    const swingLength=game.swingLength;
    const attackPulse=game.swing>0?Math.sin(T.MathUtils.clamp(1-game.swing/swingLength,0,1)*Math.PI):0;
    const stepBob=game.moving?Math.abs(Math.sin(time*gait*Math.PI))*.035:Math.sin(time*1.8)*.012;
    this.hero.position.y+=stepBob;
    this.hero.scale.set(1+attackPulse*(game.state.weaponStyle===1?.08:.045),1-attackPulse*.025,1);
    if(attackPulse>.01) this.hero.rotateZ(attackPulse*(game.facing.x>=0?-.055:.055));
    this.heroLight.position.set(x,.95,z);
    this.heroLight.color.set(game.state.realm?0xb69bff:0xffb66f);
    const lightPower=this.quality==='low'?2.7:this.quality==='medium'?4.4:6.1;
    this.heroLight.intensity=lightPower*(.96+Math.sin(time*4.7)*.035)+attackPulse*.8;
    this.heroAura.position.set(x,.018,z);
    this.heroAura.scale.setScalar(1+(game.moving?.08:0)+attackPulse*.11);
    this.heroAura.material.color.set(game.state.realm?0x9f82ed:0xf3a451);
    this.heroAura.material.opacity=this.reduced?.16:.24+attackPulse*.035;
    this.hero.material.color.set(game.guard?0xb9d8ec:game.swing>0?0xffe0b4:0xfff2e4);
    this.hero.visible=!(game.invincible>.05&&!this.reduced&&Math.floor(time*13)%3===0);
    this.heroShadow.position.set(x,.048,z);
    for(const actor of game.actors) {
      const view=this.actorSprites.get(actor.id)??this.makeActor(actor);
      const alive=actor.hp>0;
      view.sprite.visible=view.shadow.visible=alive;
      view.warning.visible=alive&&(actor.wind>0||actor.alert>0);
      view.warning.material.color.set(actor.wind>0?0xf5ad73:0xd4dbbd);
      view.warning.material.opacity=actor.wind>0?.74:.48;
      view.bar.visible=view.health.visible=alive&&!actor.spec.boss&&actor.hp<actor.spec.hp;
      if(!alive) continue;
      const point={x:T.MathUtils.lerp(actor.previous.x,actor.x,alpha),z:T.MathUtils.lerp(actor.previous.z,actor.z,alpha)};
      const enemySpeed=dt>0?Math.hypot(actor.x-actor.previous.x,actor.z-actor.previous.z)/dt:0;
      this.place(view.sprite,point,actor.facing,actor.moving,time,actor.spec.style==='wisp'?.08+Math.sin(time*3)*.07:0,enemySpeed>3.1?13:9);
      view.sprite.material.color.set(actor.flash>0?0xffb39a:actor.wind>0?0xffd0a2:actor.alert>0?0xdfe8d1:0xf9f4eb);
      view.shadow.position.set(point.x,.047,point.z);
      view.warning.position.set(point.x,.067,point.z);
      view.warning.scale.setScalar((actor.spec.boss?1.8:1)*(1.0+Math.max(0,actor.wind)*.56));
      view.bar.position.set(point.x,1.29,point.z);
      view.bar.quaternion.copy(this.camera.quaternion);
      view.health.position.set(point.x,1.298,point.z+.008);
      view.health.quaternion.copy(this.camera.quaternion);
      view.health.scale.x=Math.max(0,actor.hp/actor.spec.hp);
    }
    this.bombMarker.visible=!!game.activeBomb;
    if(game.activeBomb){
      const {point}=game.activeBomb;
      this.bombMarker.position.set(point.x,.18,point.z);
      this.bombMarker.rotation.y=time*3;
    }
    this.projectiles.count=Math.min(game.missiles.length,120);
    for(let i=0;i<this.projectiles.count;i++){
      const shot=game.missiles[i];
      this.projectiles.setMatrixAt(i,this.transform.makeTranslation(shot.x,.47,shot.z));
    }
    this.projectiles.instanceMatrix.needsUpdate=true;
    for(const fx of this.fx) {
      fx.time-=dt;
      if(fx.time<=0) {this.removeFx(fx);continue;}
      const progress=1-fx.time/fx.max;
      if(!fx.beam) fx.object.scale.setScalar(.72+progress*.83);
      fx.object.material.opacity=(1-progress)*(this.reduced?.40:.92);
      if(fx.text){
        const pos=new T.Vector3(fx.point.x,.96+progress*.9,fx.point.z).project(this.camera);
        fx.text.style.transform='translate('+((pos.x+1)*this.width*.5)+'px,'+((1-pos.y)*this.height*.5)+'px)';
        fx.text.style.opacity=String(1-progress*.78);
      }
    }
    this.renderer.render(this.scene,this.camera);
  }
}
