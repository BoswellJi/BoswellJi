/**
 * 加法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function add(arg1: number | string, arg2: number | string, ...args: number[]) {
  (arg1 = arg1.toString()), (arg2 = arg2.toString());
  const arg1Arr = arg1.split('.'),
    arg2Arr = arg2.split('.'),
    d1 = arg1Arr.length == 2 ? arg1Arr[1] : '',
    d2 = arg2Arr.length == 2 ? arg2Arr[1] : '';
  const maxLen = Math.max(d1.length, d2.length);
  const m = Math.pow(10, maxLen);
  const result = Number(((Number(arg1) * m + Number(arg2) * m) / m).toFixed(maxLen));
  const d = args[0];

  return typeof d === 'number' ? Number(result.toFixed(d)) : result;
}

/**
 * 减法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function sun(arg1: number | string, arg2: number | string) {
  return add(arg1, -arg2);
}

/**
 * 乘法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function mul(arg1: number | string, arg2: number | string, ...args: number[]) {
  const r1 = arg1.toString(),
    r2 = arg2.toString(),
    d = args[0];
  const m =
    (r1.split('.')[1] ? r1.split('.')[1].length : 0) +
    (r2.split('.')[1] ? r2.split('.')[1].length : 0);
  const resultVal = (Number(r1.replace('.', '')) * Number(r2.replace('.', ''))) / Math.pow(10, m);

  return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(d));
}

/**
 * 除法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function div(arg1: number | string, arg2: number | string, ...args: number[]) {
  const r1 = arg1.toString(),
    r2 = arg2.toString(),
    d = args[0];
  const m =
    (r2.split('.')[1] ? r2.split('.')[1].length : 0) -
    (r1.split('.')[1] ? r1.split('.')[1].length : 0);
  const resultVal = (Number(r1.replace('.', '')) / Number(r2.replace('.', ''))) * Math.pow(10, m);

  return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(d));
}
