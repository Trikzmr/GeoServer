const  monthlyAttendanceReport = require("../models/monthlyAttendanceReport");

// This function to find All Month Report of Users
async function allMonthlyReport(req, res) {
    try {
        let reportOfAllMonth = await monthlyAttendanceReport.find();

        console.log(reportOfAllMonth);
        res.json("Monthly Report of Users is Founded", reportOfAllMonth);
    }
    catch (error) {
        res.json("error", error);
    }
}


// this function for finding particualar User Report through UserName
async function monthlyReportThroughUserName (req, res) {
    let { userName } = req.params;
    try {
        let oneUserReport = await monthlyAttendanceReport.find( { userName } );
        res.json("Particualar User Report Through UserName", oneUserReport);
    }
    catch (error) {
        res.json("error", error);
    }
}


// function for finding Report of Users of specific Month of year
async function findSpecificMonthReportOfUsers(req, res) {
    let { month, year } = req.params;

    try {
        let specificMonthReportofUsers = await monthlyAttendanceReport.find({ month, year });

        res.json({
            message: "Report of Users of specific Month of year",
            data: specificMonthReportofUsers
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while fetching reports",
            error: error.message
        });
    }
}


// In this Function Find Specific User Report of Specific Month of year
async function findSpecificMonthReportThrouthUsername(req, res) {
    let { userName, month, year } = req.params;

    try {
        let specificMonthReportByUserName = await monthlyAttendanceReport.find ( {  userName, month, year } );

        res.json("Specific User Report of Specific Month of year", specificMonthReportByUserName);
    }
    catch (error) {
        res.json("error", error)
    }
}


// Export all functions
module.exports = {
    allMonthlyReport,
    monthlyReportThroughUserName,
    findSpecificMonthReportOfUsers,
    findSpecificMonthReportThrouthUsername
}
