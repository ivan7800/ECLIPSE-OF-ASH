import { Euler } from 'three';
import type { Point } from '../data/levels';

const arcCenter=Math.PI*.605;

/** Rotates the slash sector so its center points along Eira's facing on the ground plane. */
export function slashRotation(facing:Point) {
  const yaw=-Math.atan2(facing.z,facing.x)-arcCenter;
  return new Euler(-Math.PI/2,yaw,0,'YXZ');
}
