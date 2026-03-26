const monthlyAttendanceReport = require("../models/monthlyAttendanceReport");

// Get Monthly reports
async function monthlyReportGeneration (req, res) {
    try {
        let month = new Date().getMonth() + 1; // if i am not add +1 then month start from 0 to 11, After Month start from 1 to 12 
        let year = new Date().getFullYear();

        let userDetailsReport = await UserActivation.find();

        for(let user of userDetailsReport) {

            try {
                let newEachUserReport = new monthlyAttendanceReport ( {
                    userName: user.userName,
                    month,
                    year,
                    leaveAvailable: 5,
                    leaves: [],
                    present: [],
                    absent: [],
                    leaveType: []
                } ) ;

                await newEachUserReport.save();
                console.log(`Report is Created for ${user.userName}`);
                console.log(newEachUserReport);
                //  res.json("Your data is saved successfully");
            }
            catch (error) {
                res.json(`Report is already exist of user ${user.userName}`, error);
            }
        }
        res.json("Monthly Report of all Users is Generated Successfully");
    }
    catch (error) {
        res.json(error);
    }
}

// Export all functions
module.exports = monthlyReportGeneration ;