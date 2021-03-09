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
        // 新节点的值小于老节点的值就放到左边分支
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else { // 新节点的值大于老节点的值就放到右边分支
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
     * 中序遍历：左边遍历完成再输出节点值
     * 1. 先输出左子树节点，再输出根，最后输出右子树节点（先输出左子树，就会从最小的开始输出，右子树从最小的开始）；
     * 2. 从小到大输出；
     * 3. 左子树与右子树根据大小混合输出；
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
     * 先序遍历：先输出节点值
     * 1. 先输出根，
     * 1. 左子树是从大到小，右子树是从小到大；（先输出左子树，再输出右子树
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
     * 后序遍历：
     * 1. 先输出右子树的值，再输出左子树的值，最后根（先输出右子树，就会从最大的开始输出）
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
binTree.insert(3);
binTree.insert(2);
binTree.insert(1);
binTree.insert(3);
binTree.insert(4);
binTree.insert(5);
binTree.insert(7);
binTree.insert(8);

binTree.removeNode(binTree.root, 0);

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
 * 2. 从右子树开始遍历，
 */
binTree.preOrderTraverse(binTree.root, printNode);

console.log('后序遍历');
/**
 * 1. 左子树都是从小到大，右子树从大到小
 * 2. 根节点
 */
binTree.postOrderTraverse(binTree.root, printNode);