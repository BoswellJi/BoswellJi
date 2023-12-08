
export default function <T extends number>(a: T, b: T) {
  console.log(a + b,'esm');
  num++;
}

// 原始类型的变量，在别的模块中通过方法调用修改后，可获取最新值
export let num : number = 0;

export function esmAdd(): number {
   num++;
   return num;
}