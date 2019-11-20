const mongoose = require('mongoose');
const path = require('path');
const { Schema, model } = mongoose;
const Comment = require('./comment');

const ImageSchema = Schema({
    title: String,
    description: String,
    filename: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    // comments: [{ type: Schema.Types.ObjectId, ref: Comment }]
});

ImageSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename), '')
})

module.exports = model("Image", ImageSchema);