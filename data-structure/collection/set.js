
/**
 * Set: (数据结构) 
 * 1. 独一无二
 * 2. 无序
 * 
 * 操作：
 * 并集，交集，补集
 */

function Set() {
    this.items = {};
}

Set.prototype = {
    /**
     * 是否含有元素
     * @param {*} val 
     */
    has(val) {
        return this.items.hasOwnProperty(val);
    },
    /**
     * 添加元素
     * @param {*} val 
     */
    add(val) {
        if (!this.has(val)) {
            this.items[val] = val;
            return true;
        }
        return false;
    },
    /**
     * 删除元素
     * @param {*} val 
     */
    remove(val) {
        if (this.has(val)) {
            delete this.items[value];
            return true;
        }
        return false;
    },
    /**
     * 清空集合
     */
    clear() {
        this.items = {};
    },
    /**
     * 集合大小
     */
    size() {
        return Object.keys(this.items).length;
    },
    /**
     * 集合本身的大小
     */
    sizeLegacy() {
        var count = 0;
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                ++count;
            }
        }
        return count;
    },
    /**
     * 集合的值
     */
    values() {
        return Object.keys(this.items);
    },
    /**
     * 集合本身的值
     */
    valueLegacy() {
        var keys = [];
        for (var key in this.items) {
            keys.push(this.items[keys])
        }
        return keys;
    },
    /**
     * 合并集合
     * @param {*} otherSet 
     */
    union(otherSet) {
        var unionSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    },
    /**
     * 选择集合中的交集
     * @param {*} otherSet 
     */
    intersection(otherSet) {
        var intersectionSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    },
    /**
     * 选择集合中的并集
     * @param {*} otherSet 
     */
    difference(otherSet) {
        var differenceSet = new Set();
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    },
    /**
     *  当前Set是否为otherSet子级
     * @param {*} otherSet 
     */
    subset(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    },
};
