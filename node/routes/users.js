var express = require('express');
var router = express.Router();
const users = require('./../controllers/users.controller.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/doSignup', users.create);
router.get('/getUsername/:username', users.getUsername);
router.post('/doSignin', users.doSignin);

module.exports = router;
