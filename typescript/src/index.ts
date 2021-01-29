import { age } from './index4';

const myName: string = 'Boswell';
const sex: boolean = true;

console.log(myName, sex, age);

import('./index2').then(res=>{
  console.log(res);
});