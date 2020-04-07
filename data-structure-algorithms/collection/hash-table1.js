function HashTable() {
    var table = [];

    /**
    * 散列函数
    * @param {string} key 键
      @return {number} 
    */
    var loseHashCode = function (key) {
        var hash = 5381;
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash * 1013;
    }

    var ValuePair = function (key, val) {
        this.key = key;
        this.val = val;

        this.toString = function () {
            return '[' + this.key + '-' + this.val + ']';
        }
    }

    this.put = function (key, val) {
        var pos = loseHashCode(key);

        if (table[pos] === undefined) {
            table[pos] = new LinkedList();
        }
        table[pos].append(new ValuePair(key, val));
    }

    this.get = function (key) {
        var pos = table[loseHashCode(key)];
        if (table[pos] !== undefined) {
            var current = table[pos].getHead();

            while (current.next) {
                if (current.el.key === key) {
                    return current.el.val;
                }
                current = current.next;
            }

            if (current.el.key === key) {
                return current.el.val;
            }
        }
        return undefined;
    }

    this.remove = function (key) {
        table[loseHashCode(key)] = undefined;
    }
}
