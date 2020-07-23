var express = require('express');
var router = express.Router();
var multer = require('multer')
var attachmentModel = require('../models/attachments');

var upload = multer({ dest: 'uploads/' })


router.post('/attachment-upload', upload.single('upload'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.body);
    var myData = new attachmentModel(req.body);
    if (req.body.path) {
        req.body.path = decodeBase64Image(req.body.path);
    }
    myData.save()
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    console.log(response);
    return response;
}
router.get('/get-attachment', function(req, res, next) {
    console.log('here');
    attachmentModel.find(req.body.query, (err, value) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(value);
    });
});

module.exports = router;