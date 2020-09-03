
const obj = {};
let val = '';
Object.defineProperty(obj, 'key', {
  get() {
    return val;
  },
  set(v) {
    console.log(v, 'aa');
    val = v;
  }
});

obj.key = 'df';
console.log('d');