// @ts-nocheck 是忽略整个文件的类型
// @ts-ignore 是忽略一行代码的类型注释
// @ts-check 在整个文件的类型检查被忽略时，开启某一行代码的类型检查

function say(name) {
  return name;
}

// @ts-ignore
function beat(num) {
  return num;
}

/**
 * js doc 可以作为 typescript编译器的参考
 * @param {string} name 
 */
function third(name) {
  name = '';
}

export {
  say,
  beat
};