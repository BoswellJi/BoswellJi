export default (app) => {
    app.get('/:id?', (req, res, next) => {
        if (req.params.id) {
            res.send(req.params.id);
        } else {
            res.send('hffi');
            next();
        }
    });
    app.get('/:id?', (req, res, next) => {
        res.send('next');
    });
}
