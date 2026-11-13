import type { Action, Input } from '../input/controls';

export function touchControls(panel:HTMLElement,input:Input) {
  const joystick=panel.querySelector<HTMLElement>('.joystick')!;
  const thumb=joystick.querySelector<HTMLElement>('span')!;
  let id:number|null=null;
  let origin={x:0,y:0};
  const position=(event:PointerEvent)=>{
    const x=(event.clientX-origin.x)/36,z=(event.clientY-origin.y)/36;
    const magnitude=Math.max(1,Math.hypot(x,z));
    input.motion={x:x/magnitude,z:z/magnitude};
    thumb.style.transform='translate('+input.motion.x*28+'px,'+input.motion.z*28+'px)';
  };
  joystick.addEventListener('pointerdown',event=>{
    if(id!==null) return;
    const bounds=joystick.getBoundingClientRect();
    origin={x:bounds.left+bounds.width/2,y:bounds.top+bounds.height/2};
    id=event.pointerId;
    joystick.setPointerCapture(id);
    position(event);
    event.preventDefault();
  });
  joystick.addEventListener('pointermove',event=>{if(event.pointerId===id) position(event);});
  function clear(event:PointerEvent) {
    if(event.pointerId!==id) return;
    id=null;input.motion={x:0,z:0};thumb.style.transform='';
  }
  joystick.addEventListener('pointerup',clear);joystick.addEventListener('pointercancel',clear);
  joystick.addEventListener('lostpointercapture',clear);
  for(const button of panel.querySelectorAll<HTMLButtonElement>('[data-touch]')){
    const action=button.dataset.touch as Action;
    button.addEventListener('pointerdown',event=>{
      button.setPointerCapture(event.pointerId);
      input.touch(action,true);
      event.preventDefault();
    });
    const release=()=>input.touch(action,false);
    button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);
    button.addEventListener('lostpointercapture',release);
  }
}
