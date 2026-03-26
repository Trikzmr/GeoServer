const mongoose = require('mongoose');
const EmployeeLeaveRequestSchema = new mongoose.Schema(
    {       // _id is acts as primary key that will be automatcally created by mangooDB
        userId : {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        leaveType: {
             type: String,
            required: true
        },
        startingDate : {
            type: Date,
            required: true
        },
        endingDate : {
            type: Date,
            required: true
        },
        message : {
            type: String           // User send a note to Admin to Grant his/her Leave
        },
        number: {
            type: Number,
            required: true,
        },
        approvalStatus : {
            type: String,
            default: 'Pending'
        },
        adminName : {
            type: String
        },
        adminId : {   
            type: String      // Admin who approved the Leave of User
        },
        requestedDate : {
            type: Date,
            default: Date.now    // Submission_Day date (Automatically Filled)
        },
        
    }
)
let employeeLeaveRequest = mongoose.model('employeeLeaveRequest', EmployeeLeaveRequestSchema);
module.exports = employeeLeaveRequest;