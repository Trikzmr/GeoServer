const Attendances = require("../models/Attendance");
const Company = require("../models/Company");
const geolib = require("geolib");
const OffSite = require("../models/OffSite");
const User = require("../models/User");

// Live tracking API
async function liveTracking(req, res) {
  const { userName, date, time, locationLogs } = req.body;

  try {
    const checkUser = await Attendances.findOne({ userName, date });

    if (!checkUser) {
      return res.status(400).json({
        message: "Particular day user attendance does not exist",
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const company = await Company.findOne({});
    if (!company) {
      return res.status(404).json({
        message: "Company information not found",
      });
    }

    const offSiteLocation = await OffSite.findOne({
      assignedTo: user._id,
      "timeLine.startDate": { $lte: new Date() },
      "timeLine.endDate": { $gte: new Date() },
    });

    let companyLocation = {
      latitude: company.cordinates.latitude,
      longitude: company.cordinates.longitude,
    };

    if (offSiteLocation) {
      companyLocation = {
        latitude: offSiteLocation.cordinatates.lat,
        longitude: offSiteLocation.cordinatates.lng,
      };
    }

    const geofenceRadius = 500;
    const userLocation = locationLogs?.[0];

    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      return res.status(400).json({ message: "Invalid user location" });
    }

    const distance = geolib.getDistance(userLocation, companyLocation);
    const isInside = distance <= geofenceRadius;

    const attendanceStatus = isInside ? "check-in" : "check-out";

    checkUser.status.push(attendanceStatus);
    checkUser.time.push(time);
    checkUser.locationLogs.push(userLocation);

    await checkUser.save();

    return res.status(200).json(checkUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Current location API
async function CurrentLocations(req, res) {
  const { userName, date } = req.body;

  try {
    const CurrentLocation = await Attendances.findOne({ userName, date });

    if (!CurrentLocation) {
      return res.status(400).json({
        message: "Particular day user attendance does not exist",
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const logs = CurrentLocation.locationLogs;

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No location logs found" });
    }

    const lastLocation = logs[logs.length - 1];

    const company = await Company.findOne({});
    if (!company) {
      return res.status(404).json({
        message: "Company information not found",
      });
    }

    let companyLocation = {
      latitude: company.cordinates.latitude,
      longitude: company.cordinates.longitude,
    };

    const offSiteLocation = await OffSite.findOne({
      assignedTo: user._id,
      "timeLine.startDate": { $lte: new Date() },
      "timeLine.endDate": { $gte: new Date() },
    });

    if (offSiteLocation) {
      companyLocation = {
        latitude: offSiteLocation.cordinatates.lat,
        longitude: offSiteLocation.cordinatates.lng,
      };
    }

    const resBundle = {
      userLocation: lastLocation,
      companyLocation: companyLocation,
      radius: 500,
      zones: company.zoneCordinates,
    };

    return res.json(resBundle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Total hours API
async function totalHours(req, res) {
  const { userName, date } = req.body;

  try {
    const totalHour = await Attendances.findOne({ userName, date });

    if (!totalHour) {
      return res.status(404).json({
        message: "Attendance not found for this user on this date",
      });
    }

    const record = totalHour.status;

    let count = 0;
    for (let i = 0; i < record.length; i++) {
      if (record[i] === "check-in") {
        count++;
      }
    }

    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { liveTracking, CurrentLocations, totalHours };
