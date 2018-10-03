var express = require('express');
var router = express.Router();

var userController = require('../controllers/user')();

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/api/createuser', userController.createUser);
router.get('/api/getusers', userController.getAllUser);

module.exports = router;