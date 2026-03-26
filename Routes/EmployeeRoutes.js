    const express = require("express");
    const api =express.Router();
    const pendingRegistration = require("../controllers/EmployeeController")

    api.get("/GetPendingRegistration",pendingRegistration );
    
    module.exports =api;