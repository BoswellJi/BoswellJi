import _ from './util.js';

/***
 * 1. 整个元素都不一样，元素被替换掉
 * 2. 元素的属性不一样
 * 3. 元素的文本节点不一样
 * 4. 元素顺序被替换，即元素需要重新排序
 */

 import patch from './patch.js'
 import listDiff from './list-diff.js';
 
 function diff (oldTree, newTree) {
   let index = 0;
   let patches = {} // 用来记录每个节点差异的对象
   walk(oldTree, newTree, index, patches)
   return patches;
 }
 
 function walk (oldNode, newNode, index, patches) {
   let currentPatch = []

   // 新节点不存在
   if(newNode === null) {
 
   }
   // 都是文本节点
   else if (_.isString(oldNode) && _.isString(newNode)) {
     if (newNode !== oldNode) {
       currentPatch.push({ type: patch.TEXT, content: newNode })
     }
   }
  //  节点相同，属性不同
   else if (
     oldNode.tagName === newNode.tagName &&
     oldNode.key === newNode.key
   ) {
     // diff attrs
     let attrsPatches = diffAttrs(oldNode, newNode)
     if (attrsPatches) {
       currentPatch.push({ type: patch.ATTRS, attrs: attrsPatches })
     }
    //  遍历子节点
     diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
   }
   else {
     currentPatch.push({ type: patch.REPLACE, node: newNode })
   }
 
   if (currentPatch.length) {
     patches[index] = currentPatch
   }
 }

 /***
  * 
  */
 let key_id = 0
 function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
   let diffs = listDiff(oldChildren, newChildren, 'key')
   newChildren = diffs.children
 
   if (diffs.moves.length) {
     var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
     currentPatch.push(reorderPatch)
   }
 
   let leftNode = null;
   let currentNodeIndex = index;
   oldChildren.forEach( (child, i) => {
     key_id++
     currentNodeIndex = key_id
     let newChild = newChildren[i];
     // currentNodeIndex = (leftNode && leftNode.count)
     //   ? currentNodeIndex + leftNode.count + 1
     //   : currentNodeIndex + 1
 
     walk(child, newChild, currentNodeIndex, patches)
     // leftNode = child
 
   })
 }
 
 function diffAttrs (oldNode, newNode) {
   let count = 0
   let oldAttrs = oldNode.attrs
   let newAttrs = newNode.attrs
 
   let key, value
   let attrsPatches = {}
 
   // find out different attrs
   for (key in oldAttrs) {
     value = oldAttrs[key]
     if (newAttrs[key] !== value) {
       count++
       attrsPatches[key] = newAttrs[key]
     }
   }
   // find out new attr
   for (key in newAttrs) {
     value = newAttrs[key]
     if (!oldAttrs.hasOwnProperty(key)) {
       count++
       attrsPatches[key] = newAttrs[key]
     }
   }
 
   if (count === 0) {
     return null
   }
   return attrsPatches
 }

export default diff;