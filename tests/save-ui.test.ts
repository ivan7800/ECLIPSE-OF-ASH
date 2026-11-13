import { expect,test } from 'vitest';
import { fresh,readSave } from '../src/core/state';

test('un guardado antiguo v2 migra su armadura ausente sin perder los demás progresos',()=>{
  const old={...fresh(),armor:undefined,gold:77,level:'d2',position:{x:10.5,z:3.5},bosses:[0,1],tools:[0,1,2],tool:2};
  const state=readSave(old);
  expect(state).toMatchObject({version:2,armor:0,gold:77,level:'d2',bosses:[0,1],tools:[0,1,2],tool:2});
});
