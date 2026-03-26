const mongoose = require('mongoose');
let resignationLetterSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: "Pending"
        }
    } );
let resignationLetter = mongoose.model('resignationLetter', resignationLetterSchema);
module.exports = resignationLetter;

