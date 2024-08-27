// 二叉树，求所有路径中总和最大的那一条路径

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

let max = 0

function maxSum(node) {
  if (!node) {
    return 0
  }

  const leftMax = Math.max(0, maxSum(node.left))
  const rightMax = Math.max(0, maxSum(node.right))

  max = node.val + leftMax + rightMax

  // 返回当前节点为起点的最大路径和（单支）
  return node.val + Math.max(leftMax, rightMax)
}

const root = new TreeNode(-10)
root.left = new TreeNode(9)
root.right = new TreeNode(20, new TreeNode(15), new TreeNode(7))

maxSum(root)

console.log(max)
