class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function preorderTraversal(root) {
  const result = []

  function traverse(node) {
    if (node === null) return
  
    traverse(node.left) // 前序遍历左子树
    traverse(node.right) // 前序遍历右子树

    result.push(node.value) // 访问根节点
  }

  traverse(root)
  return result
}

// 示例
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

console.log(preorderTraversal(root)) // 输出 [1, 2, 4, 5, 3]
