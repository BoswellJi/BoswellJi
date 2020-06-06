"use strict";
var D = { name: '', age: 1, sex: true };
var D1 = { name: '', age: 1 };
;
var D3 = /** @class */ (function () {
    function D3(name) {
    }
    return D3;
}());
function createInstance(ctor) {
    return new ctor('');
}
createInstance(D3);
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
;
var myName = 'name';
var age = 'age';
//# sourceMappingURL=type.js.map