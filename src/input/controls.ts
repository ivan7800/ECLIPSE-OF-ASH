import { neutral, type Controls } from '../core/game';

export const bindings={up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',run:'ShiftLeft',attack:'Space',block:'KeyF',dodge:'ControlLeft',
  tool:'KeyQ',use:'KeyE',shift:'KeyR',heal:'KeyH',pause:'Escape',inventory:'KeyI',map:'KeyM',journal:'KeyJ'};
export type Bindings=typeof bindings;
export type Action=keyof Bindings;
const arrows:Partial<Record<Action,string>>={up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'};
const pad:Partial<Record<Action,number>>={attack:2,use:0,dodge:1,tool:3,block:4,run:5,shift:6,heal:7,pause:9,inventory:8};
export const keyName=(key:string)=>({Space:'Espacio',ControlLeft:'Ctrl',ShiftLeft:'Mayús',Escape:'Esc',
  ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→'}[key] ?? key.replace(/^Key|^Digit/,''));

export class Input {
  keys=new Set<string>();
  touches=new Set<Action>();
  motion={x:0,z:0};
  private old=new Set<Action>();
  private pressed=new Set<Action>();
  private released=new Set<Action>();
  private attackHeld=false;
  private awaiting:((key:string)=>void)|null=null;


  constructor(public bindings:Bindings,canvas:HTMLCanvasElement) {
    window.addEventListener('keydown',event=>{
      if (this.awaiting) {
        event.preventDefault();event.stopImmediatePropagation();
        const finish=this.awaiting;this.awaiting=null;finish(event.code);return;
      }
      const target=event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) return;
      if (target instanceof HTMLButtonElement && (event.code==='Space'||event.code==='Enter')) return;
      if (Object.values(this.bindings).includes(event.code) || event.code.startsWith('Arrow')) event.preventDefault();
      if(!this.keys.has(event.code)) {
        const action=this.actionFor(event.code);
        if(action) this.pressed.add(action);
      }
      this.keys.add(event.code);
    },{capture:true});
    window.addEventListener('keyup',event=>{
      if(this.keys.delete(event.code) && this.actionFor(event.code)==='attack') this.released.add('attack');
    });
    window.addEventListener('blur',()=>this.clear());
    canvas.addEventListener('pointerdown',event=>{
      if (event.pointerType==='mouse' && event.button===0) this.touch('attack',true);
    });
    window.addEventListener('pointerup',event=>{if(event.pointerType==='mouse'&&event.button===0) this.touch('attack',false);});
  }

  rebind(next:(key:string)=>void) {this.clear();this.awaiting=next;}

  clear() {
    this.keys.clear();this.touches.clear();this.motion={x:0,z:0};
    this.old.clear();this.pressed.clear();this.released.clear();this.attackHeld=false;
  }
  private actionFor(code:string) {
    return (Object.keys(this.bindings) as Action[]).find(action=>this.bindings[action]===code || arrows[action]===code);
  }

  touch(action:Action,down:boolean) {
    if(down){this.touches.add(action);this.pressed.add(action);}
    else if(this.touches.delete(action)&&action==='attack') this.released.add(action);
  }

  sample() {
    const controller=Array.from(navigator.getGamepads?.()??[]).find(item=>item?.connected);
    const now=new Set<Action>();
    for (const action of Object.keys(this.bindings) as Action[]) {
      if(this.keys.has(this.bindings[action]) || this.keys.has(arrows[action]??'') ||
        this.touches.has(action) || (controller && pad[action]!==undefined && controller.buttons[pad[action]!]?.pressed)) now.add(action);
    }
    for(const action of now) if(!this.old.has(action)) this.pressed.add(action);
    for(const action of this.old) if(!now.has(action)) this.released.add(action);
    this.old=now;
    this.attackHeld=now.has('attack');
    const axis=(value:number)=>Math.abs(value)>.21?(Math.abs(value)-.21)*Math.sign(value)/.79:0;
    const px=controller?axis(controller.axes[0]??0)+Number(!!controller.buttons[15]?.pressed)-Number(!!controller.buttons[14]?.pressed):0;
    const pz=controller?axis(controller.axes[1]??0)+Number(!!controller.buttons[13]?.pressed)-Number(!!controller.buttons[12]?.pressed):0;
    this.analog={x:Math.max(-1,Math.min(1,this.motion.x+px)),z:Math.max(-1,Math.min(1,this.motion.z+pz))};
    return controller??undefined;
  }
  private analog={x:0,z:0};

  take(action:Action) {
    const yes=this.pressed.has(action);
    this.pressed.delete(action);
    return yes;
  }

  discardActions() {
    for(const action of ['dodge','tool','use','shift','heal'] as const) this.pressed.delete(action);
    this.released.clear();
  }

  frame():Controls {
    const {x,z}=this.analog;
    const attackUp=this.released.delete('attack');
    return {...neutral,x:x+Number(this.old.has('right'))-Number(this.old.has('left')),
      z:z+Number(this.old.has('down'))-Number(this.old.has('up')),
      run:this.old.has('run'),attack:this.attackHeld,attackUp,block:this.old.has('block'),
      dodge:this.take('dodge'),tool:this.take('tool'),use:this.take('use'),shift:this.take('shift'),heal:this.take('heal')};
  }
}
