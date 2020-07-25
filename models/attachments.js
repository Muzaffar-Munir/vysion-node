const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentsSchema = new Schema({
    fileName: String,
    fileType: String,
    originalName: String,
    size: Number,
    path: String,
    ext: String,
    type: String
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Attachment', attachmentsSchema);