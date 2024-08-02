class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

function isSymmetric(root) {
  if (!root) return true
  return isMirror(root.left, root.right)
}

function isMirror(left, right) {
  if (!left && !right) return true // 两个子树都为空
  if (!left || !right) return false // 只有一个子树为空

  // 检查两个子树的值是否相同以及它们的子树是否镜像对称
  return (
    left.val === right.val &&
    isMirror(left.left, right.right) &&
    isMirror(left.right, right.left)
  )
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(2)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right.left = new TreeNode(4)
root.right.right = new TreeNode(3)

console.log(isSymmetric(root)) // 输出: true
