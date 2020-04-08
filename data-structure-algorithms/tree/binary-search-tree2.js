//  第二种实现
function show() {
  return this.data;
}

/**
* 树节点
* @param {*} data 节点内容
* @param {*} left 左节点引用
* @param {*} right 右节点引用
*/
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

/**
* 新增元素
* @param {*} data 节点数据
*/
function insert(data) {
  const node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node;
  } else {
    let current = this.root;
    let parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = node;
        }
        break;
      } else {
        current = current.right;
        if (current == null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}

/**
* 中序遍历
* @param {*} node 节点
*/
function inOrder(node) {
  if (node != null) {
    inOrder(node.left);
    console.log(node.show());
    inOrder(node.right);
  }
}

/**
* 先序遍历
* @param {*} node 树节点
*/
function preOrder(node) {
  if (node !== null) {
    console.log(node.show());
    preOrder(node.left);
    preOrder(node.right);
  }
}

/**
* 后序遍历
* @param {*} node 树节点
*/
function postOrder(node) {
  if (node !== null) {
    preOrder(node.left);
    preOrder(node.right);
    console.log(node.show());
  }
}

/* 获取最大值 */
function getMax() {
  var current = this.root;
  while (current.right != null) {
    current = current.right;
  }
  return current.data;
}

/* 获取最小值 */
function getMin() {
  var current = this.root;
  while (current.left != null) {
    current = current.left;
  }
  return current.data;
}

/**
* 查找特定的值
* @param {*} data 节点数据
*/
function find(data) {
  let current = this.root;
  while (current !== null) {
    if (current.data === data) {
      return current;
    } else if (data < current.data) {
      current = current.left;
    } else if (data > current.data) {
      current = current.right;
    }
  }
  return null;
}

/**
* 删除树的节点
* @param {*} node 节点
* @param {*} data 节点数据
*/
function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  // 当前节点是要找的节点
  if (data === node.data) {
    // 没有子节点
    if (node.left === null && node.right === null) {
      return null;
    }
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
    // 有两个子节点的节点
    const tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  }
  // 查找节点
  else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

function remove(data) {
  root = removeNode(this.root, data);
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
  this.getMin = getMin;
  this.getMax = getMax;
  this.find = find;
}


const nums = new BST();
nums.insert(1);
nums.insert(2);
nums.insert(3);
nums.insert(4);
nums.insert(5);
nums.inOrder(nums.root);
console.log(nums.getMax());
console.log(nums.getMin());
nums.preOrder(nums.root);
nums.postOrder(nums.root);
console.log(nums.find(1));