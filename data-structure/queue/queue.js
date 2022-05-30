/**
 * 队列数据结构
 * 1. 先入先出
 */

function Queue() {
    this.items = [];
}

Queue.prototype = {
    enqueue(el) {
        this.items.push(el);
    },
    dequeue() {
        return this.items.shift();
    },
    front() {
        return this.items[0];
    },
    isEmpty() {
        return this.items.length === 0
    },
    size() {
        return this.items.length;
    },
};
