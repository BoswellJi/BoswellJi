function Stack() {
    var items = [];
    this.push = function (el) {
        items.push(el);
    }
    this.pop = function () {
        return items.pop();
    }
    this.peek = function () {
        return items[items.length - 1];
    }
    this.isEmpty = function () {
        return items.length == 0;
    }
    this.size = function () {
        return items.length;
    }
    this.clear = function () {
        items = [];
    }
}

function binaryConversion(num, base) {
    var stack = new Stack(),
        rem = '',
        binaryString = '',
        digits = '0123456789ABCDEF';
    while (num > 0) {
        rem = Math.floor(num % base);
        stack.push(rem);
        num = Math.floor(num / base);
    }

    while (!stack.isEmpty()) {
        binaryString += digits[stack.pop()];
    }
    console.log(binaryString);
}

binaryConversion(6, 2);

console.log(parseInt('10', 2));
console.log(parseInt('010', 8));
console.log(parseInt('0x10', 16));