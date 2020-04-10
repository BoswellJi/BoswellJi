/**
 * 二叉查找树
 * 1. 左子树节点数据 小于 父节点数据
 * 2. 右子树节点数据 大于 父节点数据
 */

function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    /**
    *  插入新节点
    *  @param {Node} node 父级节点
    *  @param {Node} newNode 插入的新节点
    */
    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    },
    /**
     * 插入树节点
     * 1. 插入节点，需要从根节点开始进行查找
     * @param {*} key 
     */
    insert(key) {
        var newNode = new Node(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    },
    /**
     * 中序遍历
     * 1. 从左树中遍历，找到最小的开始
     * @param {*} node 
     * @param {*} cb 
     */
    inOrderTraverse(node, cb) {
        if (node !== null) {
            this.inOrderTraverse(node.left, cb);
            cb(node.key);
            this.inOrderTraverse(node.right, cb);
        }
    },
    /**
     * 先序遍历
     * 1. 从根节点开始，先访问左侧节点，在访问右侧节点
     * @param {*} node 
     * @param {*} cb 
     */
    preOrderTraverse(node, cb) {
        if (node !== null) {
            cb(node.key);
            this.preOrderTraverse(node.left, cb);
            this.preOrderTraverse(node.right, cb);
        }
    },
    /**
     * 后序遍历
     * 1. 从根节点开始首先遍历左树，然后遍历右树，最后是根节点
     * @param {*} node 
     * @param {*} cb 
     */
    postOrderTraverse(node, cb) {
        if (node !== null) {
            this.postOrderTraverse(node.left, cb);
            this.postOrderTraverse(node.right, cb);
            cb(node.key);
        }
    },
    /**
     * 最小值节点（最左边的左子树
     * @param {*} node 
     */
    minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    },
    /**
     * 最大值节点（最右边的右子树
     * @param {*} node 
     */
    maxNode(node) {
        if (node) {
            while (node && node.right != null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    },
    /**
     * 查找节点
     * @param {*} node 查询从根节点开始
     * @param {*} key 
     */
    findNode(node, key) {
        if (node) {
            if (key < node.key) {
                return this.findNode(node.left, key);
            } else if (key > node.key) {
                return this.findNode(node.right, key);
            } else {
                return node;
            }
        } else {
            return false;
        }
    },
    /**
     * 删除节点
     * @param {*} node 先查找，找到再删除，从根节点开始
     * @param {*} key 
     */
    removeNode(node, key) {
        if (node) {
            if (key < node.key) {
                node.left = this.removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = this.removeNode(node.right, key);
            } else {
                // 没有子节点（左右子树
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                // 没有左子树（将节点的右子树直接替换
                if (node.left === null) {
                    node = node.right;
                    return node;
                }
                // 没有右子树（将节点的左子树直接替换
                if (node.right === null) {
                    node = node.left;
                    return node;
                }
                // 有左子树，有右子树（找到右子树最小节点
                // 查找待删除节点 （左子树上最大值 或者 右子树上最小值）
                var aux = this.minNode(node.right);
                node.key = aux.key;
                // 删掉找到的节点
                node.right = this.removeNode(node.right, aux.key);
                return node;
            }
        } else {
            return null;
        }
    },
};

var binTree = new BinarySearchTree();
binTree.insert(6);
binTree.insert(2);
binTree.insert(3);
binTree.insert(4);
binTree.insert(5);
binTree.insert(7);
binTree.insert(7);
binTree.insert(8);
binTree.insert(9);

binTree.removeNode(binTree.root,0);

/**tree
 *                  6
 *     2                  7
 *       3                      9
 *          4               8
 *             5
 */
function printNode(val) {
    console.log(val);
}

console.log('中序遍历');
/**
 * 从小到大升序遍历
 */
binTree.inOrderTraverse(binTree.root, printNode);

console.log('先序遍历');
/**
 * 1. 根节点
 * 2. 左右子树，都是从小到大（从左子树开始
 */
binTree.preOrderTraverse(binTree.root, printNode);

console.log('后序遍历');
/**
 * 1. 左右子树都是从大到小（从左子树开始
 * 2. 根节点
 */
binTree.postOrderTraverse(binTree.root, printNode);