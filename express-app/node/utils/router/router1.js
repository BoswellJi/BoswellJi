'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.get('/:id?', function (req, res, next) {
        if (req.params.id) {
            res.send(req.params.id);
        } else {
            res.send('hffi');
            next();
        }
    });
    app.get('/:id?', function (req, res, next) {
        res.send('next');
    });
};