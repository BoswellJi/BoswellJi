export default function <T extends number>(a: T, b: T) {
  console.log(a + b,'esm');
}

export function esmAdd(a: string): string {
  return a;
}