/**
 * 双链表
 */
function Node(el) {
    this.el = el;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList() {
    this.length = 0;
    this.head = null;
    this.tail = null;
}

DoublyLinkedList.prototype = {
    append(el) {
        const node = new Node(el);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            const current = this.head;
            // 找到当前节点
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
            node.prev = current;
            this.tail = node;
        }
    },
    insert(pos, el) {
        if (pos >= 0 && pos <= length) {
            var node = new Node(el),
                current = this.head,
                previous,
                index = 0;
            if (pos === 0) {
                if (!this.head) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            }
            else if (pos === length) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;

                current.prev = node;
                node.prev = previous;
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
                index = 0;
            if (pos === 0) {
                this.head = current.next;
                if (length === 1) {
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (pos === length - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.length--;
            return current.el;
        } else {
            return null;
        }
    },
    indexOf(el) {
        let current = this.head,
            index = -1;
        while (current.next) {
            index++;
            current = current.next;
            if (current.el === el) {
                break;
            }
        }
        return index;
    },
    remove(el) {
        const index = this.indexOf(el);
        this.removeAt(index);
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
    getTail() {
        return this.tail;
    }
};