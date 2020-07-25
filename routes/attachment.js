var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');
var attachmentModel = require('../models/attachments');

var upload = multer({ dest: 'uploads/' })


router.post('/attachment-upload', upload.single('upload'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    var myData = new attachmentModel(req.body);
    if (req.body.path) {
        // req.body.path = decodeBase64Image(req.body.path);
        getImage(req);
    }
    // myData.save()
    //     .then(item => {
    //         res.json(item);
    //     })
    //     .catch(err => {
    //         res.status(400).send("unable to save to database");
    //     });
});

function getImage(req) {
    var base64String = req.body.path;
    let base64Image = base64String.split(';base64,').pop();
    console.log(base64Image);
    let buff = new Buffer(req.body.path, 'base64');
    console.log(fs.writeFileSync(req.body.path, buff));

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
router.delete('/delete-attachment', function(req, res) {
    attachmentModel.remove({ _id: req.body.id }, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ success: true });
    });

});

module.exports = router;