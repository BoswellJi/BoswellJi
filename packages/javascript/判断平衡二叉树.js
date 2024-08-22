function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * 二叉树的每个节点最多有两个子节点，平衡二叉树中任意一个节点的左右子树高度相差不能大于 1，满二叉树和完全二叉树都是平衡二叉树，普通二叉树有可能是平衡二叉树。
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function (root) {
  if (root === null) {
    return true
  } else {
    return (
      Math.abs(height(root.left) - height(root.right)) <= 1 &&
      isBalanced(root.left) &&
      isBalanced(root.right)
    )
  }
}

const height = function (root) {
  if (root === null) {
    return 0
  } else {
    return Math.max(height(root.left), height(root.right)) + 1
  }
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
console.log(isBalanced(root))
console.log(height(root))
