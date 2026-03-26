const mongoose = require('mongoose');
let ManualAttendanceSchema = new mongoose.Schema(
    {
        requestId : {
            type: String,
            required: true
        },
        userId : {
            type: String,
            required: true
        },
        reason : {
            typeId: String
        },
        location : {
            longitude : {
                type: Number,
                required: true
            },
            latitude : {
                type: Number,
                required: true
            } 
        },
        radius : {
            type: Number,
            default: 200
        },
        assignTo : {
            type: String     // or 'Department' if using team-level assignment
        },
        duration : {
            type: Number   // in hours or minutes (your choice)
        },
        status : {
            type: String,
            default: 'Pending'
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
    }
)
let manualAttendance = mongoose.model('manualAttendance', ManualAttendanceSchema);
module.exports = manualAttendance;