const  resignationLetter = require("../models/resignationLetter");

async function addNewResignation(req, res) {
    try {
        let { userName, message, date, status } = req.body;
        let newResignation = new resignationLetter  (
            {
                userName,
                message,
                date,
                status
            } );

        await newResignation.save();
        console.log(newResignation);
        res.json("New Resignation is Add Successfuly");
    }
    catch (error) {
        res.json("error found ", error)
    }
}

// This Function is For Get all Registration
async function getAllRegistration (req, res) {
    try {
        let seeAllRegistration = await resignationLetter.find();
        console.log(seeAllRegistration);
        res.json("All Registation : ", seeAllRegistration);
    }
    catch (error) {
        res.json("error", error);
    }
}

// This function for finding particualar User Registration through UserName
async function particularUserRegistration (req, res) {
    let { userName } = req.params;
    try {
        let particualarRegistration = await resignationLetter.find( { userName } );
        res.json(" Get Particualar Registration of Users ", particualarRegistration);
    }
    catch (error) {
        res.json("error", error);
    }
}



// Export all functions
module.exports = {
    addNewResignation,
    getAllRegistration,
    particularUserRegistration
}