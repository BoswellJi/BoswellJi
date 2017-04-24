'use strict';

function User() {
	this.name = 'jmz';
}

User.prototype = {
	enter: function enter() {
		console.log(this.name + '哈哈');
	}
};

module.exports = User;