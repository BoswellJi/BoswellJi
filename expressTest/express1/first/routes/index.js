var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { isLogin: true,name:req.session.name });
});

router.post('/login', function(req, res, next) {
  req.session.name="jmz";
  res.render('index', { isLogin: true,name:req.session.name });
});

module.exports = router;
