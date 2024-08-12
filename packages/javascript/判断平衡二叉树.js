function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
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
