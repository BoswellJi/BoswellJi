/***
 * js层面计算，返回patch对象，解析patch对象，完成渲染；
 * 
 * 1. vdom模拟
 * 2. 新老vdom之间的diff得出patch
 * 3. 由patch来修复当前老的vdom
 */

import el from './element.js';
import diff from './diff.js';
import patch from './patch.js';

let ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
]);

let ul1 = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 3']),
  el('li', { class: 'item' }, ['Item 2'])
]);

/***
 * 首次渲染
 */
const root = ul.render();
document.body.append(root);

/***
 * 更新比对
 */
const patchses = diff(ul,ul1);

/***
 * 打补丁
 */
patch(root,patchses);