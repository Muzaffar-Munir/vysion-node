var express = require('express');
var router = express.Router();
var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })


router.post('/attachment-upload', upload.single('upload'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });

router.post('/get-attachment', function (req, res, next) {

});

module.exports = router;
