function BinarySearchTree() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    var root = null;

    /**
    *  插入新节点
    *   @param {Node} node 父级节点
        @param {Node} newNode 插入的新节点
    */
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    }

    //插入数据
    this.insert = function (key) {
        var newNode = new Node(key);

        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    }

    var inOrderTraverse = function (node, cb) {
        if (node !== null) {
            inOrderTraverse(node.left, cb);
            cb(node.key);
            inOrderTraverse(node.right, cb);
        }
    }

    // 中序遍历
    // 从左树中遍历，找到最小的开始
    this.inOrderTraverse = function (cb) {
        inOrderTraverse(root, cb);
    }

    var preOrderTraverse = function (node, cb) {
        if (node !== null) {
            cb(node.key);
            preOrderTraverse(node.left, cb);
            preOrderTraverse(node.right, cb);
        }
    }

    // 先序遍历
    // 从根节点开始，先访问左侧节点，在访问右侧节点
    this.preOrderTraverse = function (cb) {
        preOrderTraverse(root, cb);
    }

    var postOrderTraverse = function (node, cb) {
        if (node !== null) {
            postOrderTraverse(node.left, cb);
            postOrderTraverse(node.right, cb);
            cb(node.key);
        }
    }

    // 后序遍历
    // 从根节点开始首先遍历左树，然后遍历右树，最后是根节点
    this.postOrderTraverse = function (cb) {
        postOrderTraverse(root, cb);
    }

    /**
    搜索树中的值
    1. 最小值
    2. 最大值
    3、 搜索特定的值
    */
    var minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }
    this.min = function () {
        return minNode(root);
    }

    var maxNode = function (node) {
        if (node) {
            while (node && node.right != null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }
    this.max = function () {
        return maxNode(root);
    }

    var findNode = function (node, key) {
        if (node) {
            if (key < node.key) {
                return findNode(node.left, key);
            } else if (key > node.key) {
                return findNode(node.right, key);
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    this.find = function (key) {
        return findNode(root, key);
    }

    var findMinNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        }
        return null;
    }

    var removeNode = function (node, key) {
        if (node) {
            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
            } else {
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }

                if (node.left === null) {
                    node = node.right;
                    return node;
                }

                if (node.right === null) {
                    node = node.left;
                    return node;
                }

                var aux = findMinNode(node.right);
                node.key = aux.key;
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        } else {
            return null;
        }
    }

    this.remove = function (key) {
        root = removeNode(root, key);
    }
}

// var binTree = new BinarySearchTree();
// binTree.insert(6);
// binTree.insert(2);
// binTree.insert(3);
// binTree.insert(4);
// binTree.insert(7);

// function printNode(val) {
//     console.log(val);
// }
// binTree.remove(6);
// binTree.inOrderTraverse(printNode);
// binTree.preOrderTraverse(printNode);
// binTree.postOrderTraverse(printNode);

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
// nums.inOrder(nums.root);
// console.log(nums.getMax());
// console.log(nums.getMin());
// nums.preOrder(nums.root);
// nums.postOrder(nums.root);
// console.log(nums.find(1));