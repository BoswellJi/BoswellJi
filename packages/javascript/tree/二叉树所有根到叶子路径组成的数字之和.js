class TreeNode {
  constructor(value = 0, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

function sumNumbers(root) {
  // 辅助递归函数
  function dfs(node, currentNumber) {
    if (!node) {
      return 0
    }

    // 更新当前路径数字
    currentNumber = currentNumber * 10 + node.value

    // 如果是叶子节点，返回当前路径数字
    if (!node.left && !node.right) {
      return currentNumber
    }

    // 递归计算左右子树的和
    let leftSum = dfs(node.left, currentNumber)
    let rightSum = dfs(node.right, currentNumber)

    return leftSum + rightSum
  }

  // 从根节点开始遍历，初始数字为0
  return dfs(root, 0)
}

// 示例二叉树
let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(2)
root.left.right = new TreeNode(2)

// 计算根到叶子的路径组成的数字之和
console.log(sumNumbers(root)) // 输出: 25
