const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = Schema({
    name: String,
    email: String,
    birthdate: Date,
    password: String,
    phone: String,
    // images: [{ type: Schema.Types.ObjectId, ref: Image }]
});

module.exports = model("User", UserSchema);