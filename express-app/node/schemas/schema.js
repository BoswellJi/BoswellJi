'use strict';

var jugglingdb = require('jugglingdb'),
    Schema = jugglingdb.Schema,
    config = require('../config/config');

exports.schema = function () {
	return new Schema('mysql', config.mysql);
};