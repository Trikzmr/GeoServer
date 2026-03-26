const mongoose = require('mongoose');
let MonthlyAttendanceReportSchema = new mongoose.Schema (
    {
        userName : {
            type: String,
            required: true
        },
        month : {       // It will be the primary key along with Year and Month
            type: Number,
            min : 1, max : 12,
            required: true
        },
        year : {
            type: Number,
            required: true
        },
        present : {          // total days Present in month OR Store present dates like ["2025-06-01"]
            type: [String],
            default: []
        },
        absent : {                            // Store the Days Absent
            type: [String],
            default: []
        },
        leaves : {                   //Store the Granted Leaves Dates
            type: [String],
            default: []
        },
        leaveAvailable : {          //  Number of available leaves in a month
            type: Number,
            default: 5
        },
        leavesType : {
            type: [String],     // It srore data like ["Fever","Family_Trip"]
        },
        createdAt : {
            type: Date,
            default: Date.now
        }
    }
)
let monthlyAttendanceReport = mongoose.model('monthlyAttendanceReport', MonthlyAttendanceReportSchema);
module.exports = monthlyAttendanceReport;

