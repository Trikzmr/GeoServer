const express =require("express");
const api =express.Router();
const {liveTracking,CurrentLocations,totalHours} = require("../controllers/TrackingController");
const employeeMiddleware = require("../Middleware/employeeAuthentication");

api.post("/liveTracking",liveTracking);
api.post("/currentLocation",CurrentLocations);
api.get("/workingHours",totalHours);
module.exports=api;