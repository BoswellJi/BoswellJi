/**
 * 二叉搜索树（Binary Search Tree）又名二叉查找树、二叉排序树。它是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。
 */

class TreeNode {
  constructor(value = 0, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

function kthLargestInBST(root, k) {
  let count = 0
  let result = null

  function reverseInorderTraversal(node) {
    if (!node || result !== null) {
      return
    }

    // 先遍历右子树
    reverseInorderTraversal(node.right)

    // 处理当前节点
    count++
    if (count === k) {
      result = node.value
      return
    }

    // 然后遍历左子树
    reverseInorderTraversal(node.left)
  }

  reverseInorderTraversal(root)
  return result
}

// 示例用法
// 构造一个二叉搜索树
//       5
//      / \
//     3   6
//    / \
//   2   4
//  /
// 1
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.left.left.left = new TreeNode(6)

const k = 1
console.log(`The ${k}rd largest node is ${kthLargestInBST(root, k)}`)
