const mongoose = require('mongoose');

const attachmentsSchema = new Schema({
    modeName: String,
    fileName: String,
    fileMd5Name: String,
    fileType: String,
    fileSize: Number,
    path: String,
    createdAt: String,
    updatedAt: String,
    fileType: String
}, { timestamps: true });

module.exports = mongoose.model('Attachment', attachmentsSchema);