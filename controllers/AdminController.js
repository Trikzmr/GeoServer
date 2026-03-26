const Calanders = require("../models/workingCalander");
const Userr = require("../models/User");
const Company = require("../models/Company");
//Create an api to create monthly attendance callender

async function monthlyCalanders(req, res){
    const {
        year,
        month,
        dayCalander
       } = req.body;
       try {
        const monthlyCalander = await Calanders.findOne({ year, month }); 
        if(monthlyCalander){
            return res.json("month calender allready created");
        }
        const oneMonth = new Calanders({
        year,
        month,
        dayCalander});
        await oneMonth.save();
        res.status(201).json(oneMonth);
       }  catch (error) {
                console.error("Error creating calendar:", error);
                res.status(500).json({ error: "Internal server error", details: error.message });
}
}

//Create an api to update monthly calender

async function updateCalender (req, res) {
  const {
        year,
        month,
        dayCalander
       } = req.body;

  if (!year || !month || !dayCalander) {
    return res.status(400).json({ message: "Missing required data"});
  }

  try {
    const existing = await Calanders.findOne({year, month});
    if (!existing) {
      return res.status(400).json({ message: "Calendar not exists for this month" });
    }
    existing.dayCalander = dayCalander;

    existing.updatedAt = new Date();
    await existing.save();
    res.status(201).json("SUCCESSFULL UPDATE");

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//Create an api to Delete monthly calender
async function deletecalender(req, res) { 
    try {
        const {
        year,
        month
       } = req.body;
        const existing = await Calanders.findOne({year, month});
        if (!existing) {
        return res.status(400).json({ message: "Calendar not exists for this month" });
       }
        await Calanders.deleteOne({year, month});
        res.json("Deleted Successfully");
    } catch (error) {
        res.json(error);
    }
}

async function changeRoles(req,res) {
  const {userName,role} = req.body;
  try {
    const changeRole = await Userr.findOne({userName});
    if(!changeRole){
      return res.status(400).json("user not found");
    }
    changeRole.role=role;
    await changeRole.save();
    res.json("Role change succesfully");
    
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
}


async function CompanyDetails(req, res) {
    try {
        const company = await Company.findOne();

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: company
        });

    } catch (error) {
        console.error("Error fetching company details:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


// UPDATE Company Details (single company)
async function updateCompanyDetails(req, res) {
    try {
        let company = await Company.findOne();

        // If not exists → create it
        if (!company) {
            company = await Company.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Company created successfully",
                data: company
            });
        }

        // Update existing
        company = await Company.findOneAndUpdate(
            {},
            { $set: req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });

    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


module.exports={monthlyCalanders,updateCalender,deletecalender,changeRoles, CompanyDetails, updateCompanyDetails};