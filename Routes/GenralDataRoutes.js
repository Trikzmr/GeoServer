const express =require("express");
const api =express.Router();
const {allcalenders,monthCalender,yearWeekend } = require("../controllers/GenralDataController");
const employeeMiddleware = require("../Middleware/employeeAuthentication");

api.get("/getAllCalender",allcalenders);
api.post("/getCalenders",monthCalender);
api.post("/getWeekend",yearWeekend);

module.exports=api;