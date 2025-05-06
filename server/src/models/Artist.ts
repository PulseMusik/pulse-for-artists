const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    bio: {
        type: String,
        maxlength: 1000,
        default: '',
    },
    phoneNumber: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema);

export default Artist