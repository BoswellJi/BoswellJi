class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function depth(root) {
  if (root == null) {
    return 0
  }

  let max = 0
  let arr = [{ node: root, depth: 1 }]

  while (arr.length > 0) {
    const { node, depth } = arr.shift()
    max = Math.max(depth, max)

    if (node.left !== null) {
      arr.push({ node: node.left, depth: depth + 1 })
    }

    if (node.right !== null) {
      arr.push({ node: node.right, depth: depth + 1 })
    }
  }

  return max
}

/**
 * 解法一
 * @param {*} root
 * @returns
 */
function maxDepth(root) {
  if (root === null) {
    return 0
  }

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth, rightDepth) + 1
}

// 示例
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.right = new TreeNode(6)

console.log(maxDepth(root)) // 输出 3
