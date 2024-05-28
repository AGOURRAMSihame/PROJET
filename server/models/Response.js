// models/response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    formData: [{
        label: String,
        value: mongoose.Schema.Types.Mixed
    }],
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
