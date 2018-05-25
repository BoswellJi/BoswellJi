var fs = require('fs');
var enters = [];

function getEnter() {
    var str = fs.readFileSync('.tasks', 'utf-8');
    var strArr = str.split('--');
    strArr.map(function (item) {
        var enter = {};
        var tempArr = item.split('\n');
        tempArr.map(function (item) {
            enter.content+=item;
        });
        enters.push(enter);
    });
    return enters
}

console.log(getEnter());

