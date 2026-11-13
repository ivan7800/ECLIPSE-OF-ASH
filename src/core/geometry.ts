import { tile, type Level, type Point } from '../data/levels';
export const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);

export function blocked(level:Level,at:Point,realm:number,swim:boolean,gateOpen:boolean,radius=.24) {
  for (const [x,z] of [[at.x-radius,at.z-radius],[at.x-radius,at.z+radius],[at.x+radius,at.z-radius],[at.x+radius,at.z+radius]]) {
    const value=tile(level,x,z,realm,gateOpen);
    if (value==='#' || value==='G'&&!gateOpen || value==='~'&&!swim) return true;
  }
  return false;
}

export function slide(at:Point,dx:number,dz:number,isBlocked:(point:Point)=>boolean) {
  if (!isBlocked({x:at.x+dx,z:at.z})) at.x+=dx;
  if (!isBlocked({x:at.x,z:at.z+dz})) at.z+=dz;
}
export function vector(from:Point,to:Point):Point {
  const length=distance(from,to) || 1;
  return {x:(to.x-from.x)/length,z:(to.z-from.z)/length};
}
export function clearLine(from:Point,to:Point,isBlocked:(point:Point)=>boolean) {
  const steps=Math.ceil(distance(from,to)*5);
  for (let step=1;step<steps;step++) {
    const fraction=step/steps;
    if (isBlocked({x:from.x+(to.x-from.x)*fraction,z:from.z+(to.z-from.z)*fraction})) return false;
  }
  return true;
}
