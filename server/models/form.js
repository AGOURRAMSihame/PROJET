const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: String, 
    inputs: [{
        type: { type: String },
        label: String,
        options: [String]
    }],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
