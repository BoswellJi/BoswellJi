/**
 * 复制文案
 * @param {*} front_show_link 
 * @param {*} cb
 * @returns 
 */
 export function copyText(front_show_link,cb) {
  if (!front_show_link) return;
  let input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", front_show_link);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 9999);
  if (document.execCommand("copy")) {
    cb("复制成功");
  } else {
    cb("复制失败，请手动复制");
  }
  document.body.removeChild(input);
  input = null;
}