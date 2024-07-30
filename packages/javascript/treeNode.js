class TreeNode {
  constructor(val) {
    this.val = val
    this.children = []
  }
}

function buildTree(parentMap) {
  // 创建所有节点
  const nodes = {}
  for (const key in parentMap) {
    nodes[key] = new TreeNode(key)
  }

  let root = null

  for (const child in parentMap) {
    const parent = parentMap[child]
    if (parent === null) {
      root = nodes[child]
    } else {
      nodes[parent].children.push(nodes[child])
    }
  }

  return root
}

const parentMap = {
  A: null,
  B: 'A',
  C: 'A',
  D: 'B',
  E: 'B',
  F: 'C'
}

const root = buildTree(parentMap)

function printTree(node, level = 0) {
  if (node) {
    console.log(' '.repeat(level * 2) + node.val)
    for (const child of node.children) {
      printTree(child, level + 1)
    }
  }
}

printTree(root)
