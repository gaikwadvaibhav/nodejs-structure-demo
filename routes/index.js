var express = require('express');
var router = express.Router();

var userController = require('../controllers/user')();

// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         var datetimestamp = Date.now();
//         const fileName = file.originalname.split('.').slice(0, -1).join('.')
//         const extention = file.originalname.substr((Math.max(0, file.originalname.lastIndexOf(".")) || Infinity) + 1)
//         callback(null, fileName + "-" + datetimestamp + "." + extention);
//     }
// });

// var upload = multer({ storage: storage })

var multer  = require('multer');
var upload = multer({ dest: 'upload/'});

var fs = require('fs');

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/api/createuser', userController.createUser);
router.get('/api/getusers', userController.getAllUser);
router.post('/api/fileupload', upload.single('recfile'), userController.fileUpload)
// upload.array('recfile', 10) // for multiple file uploads 
router.get('/api/getsingleuser', userController.getSingleUser);


module.exports = router;