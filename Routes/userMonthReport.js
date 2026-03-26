const express = require("express");
const api = express.Router();

const { allMonthlyReport, monthlyReportThroughUserName, findSpecificMonthReportOfUsers, findSpecificMonthReportThrouthUsername } = require("../controllers/monthlyReportControllers");

api.get('/allMonthlyReport', allMonthlyReport);
api.get('/monthlyReportThroughUserName/user/:userName', monthlyReportThroughUserName);
api.get('/findSpecificMonthReportOfUsers/month/:month/year/:year', findSpecificMonthReportOfUsers);
api.get('/findSpecificMonthReportThrouthUsername/user/:username/month/:month/year/:year', findSpecificMonthReportThrouthUsername);


module.exports = api;