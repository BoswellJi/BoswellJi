
/**
 *  单链表查找，只能从头开始找
 *  遍历节点(插入节点在前一个节点和当前节点之间)
 * @param {*} el 
 */
function Node(el) {
    this.element = el;
    this.next = null;
}

function LinkedList() {
    this.length = 0;
    this.head = null;
}

exports.LinkedList = LinkedList;

LinkedList.prototype = {
    append(el) {
        var node = new Node(el),
            current;
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    },
    insert(pos, el) {
        if (pos > -1 && pos <= this.length) {
            var node = new Node(el),
                current = this.head,
                previous = null,
                index = 0;
            if (pos === 0) {
                this.head = node;
                node.next = current;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    },
    removeAt(pos) {
        if (pos > -1 && pos < length) {
            var current = this.head,
                previous,
                index;

            if (pos === 0) {
                this.head = current.next;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    },
    remove(el) {
        var index = this.indexOf(el);
        return this.removeAt(index);
    },
    indexOf(el) {
        var current = this.head,
            index = -1;
        while (current) {
            if (el === current.el) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    },
    isEmpty() {
        return this.length === 0;
    },
    size() {
        return this.length;
    },
    toString() {
        var current = this.head,
            string = '';
        while (current) {
            string += current.el;
            current = current.next;
        }
        return string;
    },
    getHead() {
        return this.head;
    },
    showAll() {
        let head = this.getHead();
        while (head) {
            head = head.next;
        }
    },
};

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

const list1 = new LinkedList();

list1.append(2);
list1.append(4);
list1.append(6);

// 遍历链表
list.showAll();

const listAll = mergeTwoLists(list1,list);


// 合并有序链表
function mergeTwoLists(l1, l2) {
    if (l1 == null) {
        return l2;
    } else if (l2 == null) {
        return l1;
    }

    if (l1.val >= l2.val) {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    } else {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    }
};
// 反转链表
function reverseList1(head) {
    if (head == null || head.next == null) {
        return head
    }
    const current = reverseList(head.next);

    head.next.next = head;
    head.next = null
    return current;
};
function reverseList(head) {
    let prev = null, curr = head, tmp
    // 从头节点开始
    while (curr) {
        // 后一个节点
        tmp = curr.next
        // 当前节点的前一个节点
        curr.next = prev
        // 当前节点给前一个
        prev = curr
        // 后一个给到当前
        curr = tmp
    }
    return prev
};