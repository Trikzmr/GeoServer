const employeeLeaveRequest = require("../models/employeeLeaveRequest");


// const express = require("express");
// const app = express.Router();

//  In this Function you can add all Leaving Request
// app.post('/addLeaveRequest', employeeAddLeaveRequest);
async function employeeAddLeaveRequest (req, res) {
    try {
        let { userId,userName, title,leaveType,startingDate, endingDate, message, number} = req.body;
        let leaveRequest = new employeeLeaveRequest ( {
            userId,
            userName,
            title,
            leaveType,
            startingDate,
            endingDate,
            message,
            number,      
        } );
    
        await leaveRequest.save();
        console.log(leaveRequest);
        res.json("Your data is saved successfully");
    } 
    catch (error) {
        res.json(error);
    }
    
}

//  In this Function you see/get all Leaving Request
// app.get('/getAllLeaveRequest', seeAllLeaveRequest);
async function seeAllLeaveRequest(req, res) {
    try {
        const allLeaveRequest = await employeeLeaveRequest.find();
        console.log(allLeaveRequest);
        res.json(allLeaveRequest);
    }
    catch (error) {
        res.json(error);
    }
}


//  In this Function you can see the details of one leave at a time but not all. You give the UserID of that leave request which you want to see
  // app.get('/getLeaveRequestByid/:id', findLeaveRequestByProvidedId);
async function findLeaveRequestByProvidedId (req, res) {
    let {id} = req.body;
    try {
        const oneLeaveRequest = await employeeLeaveRequest.findById(id);  // Find By Id and that Id is send throurh link

        if(oneLeaveRequest) {
            res.json(oneLeaveRequest);
        }
        else {
            res.status(404).json("Leave Request of Given UserId is Not Found");
        }

    }
    catch (error) {
        res.json(error);
    }
}


// In thas function updates the leave request and sets status to "Approved"
async function approveLeaveRequest (req, res) {
    try {
        let { approvalStatus,  adminId } = req.body;
        
        /*
        if(approvalStatus !== "Approved") {
            return res.json("Your Leave is not Approved till now and Only Approved is allow");
        }
        */

        let updatesLeaveRequest = await employeeLeaveRequest.findByIdAndUpdate( req.params.id, { approvalStatus, adminId },{ new: true } );

        
        if (!updatesLeaveRequest) {
            return res.status(404).json("Leave request not found")
        }
        
        res.json( "Leave is Approved", updatesLeaveRequest);
    }
    catch (error) {
        res.json(error);
    }
}


//  Reject The Leave request on this Function
async function rejectLeaveRequest(req, res) {
    try {
        let { approvalStatus,  adminId } = req.body;

        let rejectRequest = await employeeLeaveRequest.findByIdAndUpdate ( req.params.id, { approvalStatus, adminNote, adminId }, { new: true } );

        if (!rejectRequest) {
            return res.status(404).json("Leave request not found")
        }

        res.json("Leave is Rejected", rejectRequest);
    }
    catch (error) {
        res.json(error);
    }
    
}


// In this Function you can Delete the Leave Request
async function deleteLeaveRequest (req, res) {
    try {
        let deleteRequest = await employeeLeaveRequest.findByIdAndDelete (req.params.id);
        res.json("Deleted Successfully");
    }
    catch (error) {
        res.json(error);
    }
}

async function findLeaveRequestByuserId(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const leaveRequests = await employeeLeaveRequest.find({ userId });

    if (!leaveRequests || leaveRequests.length === 0) {
      return res.status(404).json({ message: "No leave requests found" });
    }

    return res.status(200).json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}




// Export all functions
module.exports = {
    employeeAddLeaveRequest, 
    seeAllLeaveRequest,
    findLeaveRequestByProvidedId,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    findLeaveRequestByuserId
}