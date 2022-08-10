/**
 * 字典数据结构
 */

function Dictionary() {
    this.items = {};
}

Dictionary.prototype = {
    has(key) {
        return key in this.items;
    },
    set(key, value) {
        this.items[key] = value;
    },
    remove(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    },
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    },
    // 字典拷贝
    values() {
        var values = {};
        for (var k in this.items) {
            if (this.has(k)) {
                values[k] = this.items[k]
            }
        }
        return values;
    },
    // 字典长度
    count() {
        let num = 0;
        for (var k in this.items) {
            if (this.has(k)) {
                num++;
            }
        }
        return num;
    },
    // 字典清空
    clear() {
        for (var k in this.items) {
            if (this.has(k)) {
                delete this.items[k];
            }
        }
    },
    // 字典排序
    sort() {
        let result = {};
        Object.keys(this.items).sort().forEach(item => {
            result[item] = this.items[item];
        });
        return result;
    }
};
