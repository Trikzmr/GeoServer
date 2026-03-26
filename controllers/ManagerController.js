const userr = require("../models/User");
const employeeLeaveRequest = require("../models/employeeLeaveRequest");
const Attendance = require("../models/Attendance");
const OffSite = require("../models/OffSite");

//create an api to get the list of all pending employee registration
async function workingEmployes(req, res) {
  try {
    const workingEmploye = await userr.find({ status: "approved" });
    if (workingEmploye.length === 0) {
      return res.json("no approved usersfound");
    }
    res.json(workingEmploye);
  } catch (error) {
    res.json(error);
    res.json("internal server error");
  }
}

// Get employee details by userName
async function getEmployeeByUsername(req, res) {
  try {
    const userName =
      req.query.userName || req.params.userName || req.body.userName;

    if (!userName) {
      return res.status(400).json({ message: "userName is required" });
    }

    const user = await userr.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

// Get dashboard statistics
async function getDashboardStats(req, res) {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Get total employees (approved status)
    const totalEmployees = await userr.countDocuments({ status: "approved" });

    // Get pending leave requests
    const pendingLeaveRequests = await employeeLeaveRequest.countDocuments({
      approvalStatus: "Pending",
    });

    // Get today's attendance count
    const todayAttendance = await Attendance.countDocuments({ date: today });

    // Get total approved employees and subtract today's attendance to get absent count
    const todayAbsent = totalEmployees - todayAttendance;

    const statsData = [
      { title: "Total Employee", value: totalEmployees.toString() },
      {
        title: "Pending Leave Requests",
        value: pendingLeaveRequests.toString(),
      },
      { title: "Today Attendance", value: todayAttendance.toString() },
      { title: "Today Absent", value: todayAbsent.toString() },
    ];

    return res.status(200).json(statsData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

//Create an api to accept employee registration. API will help to verify the employee registration by changing its status from pending to approved

async function approvedEmployes(req, res) {
  let { userName } = req.body;
  try {
    const approvedEmploye = await userr.findOne({ userName });
    if (!approvedEmploye) {
      return res.json("user not found");
    }
    if (approvedEmploye.status === "approved") {
      return res.json("user is already approved");
    }
    approvedEmploye.status = "approved";
    await approvedEmploye.save();
    res.json("user approved successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
}
//Create an api to Reject employee registration. API will help to Reject the employee registration by changing its status from pending to Rejected

async function rejectEmployes(req, res) {
  const { userName } = req.body;
  try {
    const rejectEmploye = await userr.findOne({ userName });
    if (!rejectEmploye) {
      return res.json("user not found");
    }
    if (rejectEmploye.status === "rejected") {
      return res.json("user is already rejected");
    }
    rejectEmploye.status = "rejected";
    await rejectEmploye.save();
    res.json("user rejected successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
}

//Create an api to Remove employee registration. API will help to terminate the employee registration by changing its status from active to terminated

async function terminateEmployes(req, res) {
  const { userName } = req.body;
  try {
    const terminateEmploye = await userr.findOne({ userName });
    if (!terminateEmploye) {
      return res.json("user not found");
    }
    if (terminateEmploye.status === "Terminated") {
      return res.json("user is already terminated");
    }
    terminateEmploye.status = "Terminated";
    await terminateEmploye.save();
    res.json("user terminated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server error");
  }
}

async function assignOffSite(req, res) {
  try {
        const { userName, offSiteLocation, timeline} = req.body;
    const employee = await userr.findOne({ userName });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    const id = employee._id;
    const newOffSite = new OffSite({
        title: `Off-site assignment for ${employee.firstName} ${employee.lastName}`,
        cordinatates: {
            lat: offSiteLocation.lat,
            lng: offSiteLocation.lng
        },
        assignedTo: id,
        timeLine: {
            startDate: timeline.startDate,
            endDate: timeline.endDate
        }
    })
    await newOffSite.save();
    res.status(200).json({ message: "Off-site assigned successfully", offSite: newOffSite });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

async function ActiveOffSite(req, res) {
    try {
        const today = new Date();
        const activeOffSites = await OffSite.find({
            "timeLine.startDate": { $lte: today },
            "timeLine.endDate": { $gte: today }
        }).populate('assignedTo', 'firstName lastName userName');
        
        return res.status(200).json(activeOffSites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error", error: error.message });
    }
}

module.exports = {
  workingEmployes,
  approvedEmployes,
  rejectEmployes,
  terminateEmployes,
  getEmployeeByUsername,
  getDashboardStats,
  assignOffSite,
  ActiveOffSite,
};
