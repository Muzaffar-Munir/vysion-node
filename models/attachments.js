const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentsSchema = new Schema({
    fileName: String,
    fileMd5Name: String,
    fileType: String,
    fileSize: Number,
    path: String,
    createdAt: String,
    updatedAt: String,
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Attachment', attachmentsSchema);