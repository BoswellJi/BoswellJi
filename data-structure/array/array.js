function Array() {
    this.length = 0;
    this.dataStore = [];
}

Array.prototype = {
    indexOf(item) {
        for (let i = 0; i < this.listSize; i++) {
            if (item === this.dataStore[i]) {
                return i;
            }
        }
        return -1;
    },
    join(symbol) { },
    toString() { },
    concat() { },
    splice(startIndex, num, arr) { },
    push() { },
    unshift() { },
    pop() { },
    shift() { },
    reveres() { },
    sort() { },
    forEach() { },
    every() { },
    some() { },
    reduce() { },
    reduceRight() { },
    map() { },
    filter() { },
};