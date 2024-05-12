/**
 * 栈数据结构
 * 1. 先入后出
 */
function Stack() {
    this.items = [];
    this.top = 0;
}

Stack.prototype = {
    push(el) {
        this.items[this.top++] = el;
    },
    pop() {
        this.items.length = --this.top;
    },
    peek() {
        return this.items[this.top-1];
    },
    isEmpty() {
        this.items.length === 0;
        this.top = 0;
    },
    size() {
        return this.top;
    },
    clear() {
        this.items = [];
    }
};