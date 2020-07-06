/**
 * 一般使用数组存储
 */

// 根节点a，左子树b，右子树c, b的左子树，b的右子树
// (i=1)根a   2*i=2左子树b   2*i+1=3右子树c  (i=2)2*i=2b的左子树 2*1+1=5b的右子树
/**
 * i: 代表深度
 * 第一层 i=1（根节点i=1）
 * 第二层 2*i=2 2*i+1=3
 * 第三层 2*i=4 2*i+1=5
 */
const tree = [undefined, 1, 2, 3, 4, 5];
// 节点z存储在i位置， 2*i位置就是z的左节点，2*i+1位置就是z的右节点 
// i/2就是z的父节点

// 前序遍历
for (let i = 1; i < trees.length; i++) {
  console.log(trees[i]);
}