const express = require("express");
const api = express.Router();
const  monthlyReportGeneration = require("../utils/monthlyReportGeneration");

api.post('/monthlyReportGenerationOfEachUsers', monthlyReportGeneration);

module.exports = api;