var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');
var attachmentModel = require('../models/attachments');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = 'uploads';
        fs.mkdir(dir, err => cb(null, 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, Math.round(Math.random() * new Date().getTime()) + file.originalname);
    }
})
var upload = multer({ storage: storage })


router.post('/attachment-upload', upload.single('upload'), function(req, res, next) {
    console.log(req.file);
    console.log(req.body);
    const attachmentInfo = req.file;
    const fileData = {
        ext: req.body.ext || '',
        type: req.body.type || '',
        fileType: attachmentInfo.mimetype || '',
        size: attachmentInfo.size || null,
        fileName: attachmentInfo.filename,
        originalName: attachmentInfo.originalname,
        path: `uploads/${attachmentInfo.filename}`
    };
    const attachmentData = new attachmentModel(fileData);
    attachmentData.save((err, data) => {
        if (err) {
            return res.status(400).send({ error: err })
        }
        return res.json(data);
    });

});

function getImage(req) {
    var base64String = req.body.path;
    let base64Image = base64String.split(';base64,').pop();
    console.log(base64Image);
    let buff = new Buffer(req.body.path, 'base64');
    console.log(fs.writeFileSync(req.body.path, buff));

}
router.post('/get-attachment', function(req, res, next) {
    console.log('here');
    console.log(req.body.query);
    attachmentModel.find(req.body.query, (err, value) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(value);
    });
});
router.delete('/delete-attachment/:id', function(req, res) {
    attachmentModel.remove({ _id: req.params.id }, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ success: true });
    });

});

module.exports = router;