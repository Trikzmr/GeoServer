const express = require("express");
const api = express.Router();
const {
  workingEmployes,
  approvedEmployes,
  rejectEmployes,
  terminateEmployes,
  getEmployeeByUsername,
  getDashboardStats,
  assignOffSite,
  ActiveOffSite,
} = require("../controllers/ManagerController");

api.get("/getEmployes", workingEmployes);
api.post("/approveRegistration", approvedEmployes);
api.post("/rejectRegistration", rejectEmployes);
api.get("/terminateEmployee", terminateEmployes);
api.post("/getEmployeeByUsername", getEmployeeByUsername);
api.get("/dashboardStats", getDashboardStats);
api.post("/assignOffSite", assignOffSite);
api.get("/getActiveOffSite", ActiveOffSite)

module.exports = api;
