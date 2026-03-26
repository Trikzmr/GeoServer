const express = require("express");
const api = express.Router();
const { employeeAddLeaveRequest, seeAllLeaveRequest, findLeaveRequestByProvidedId, approveLeaveRequest, rejectLeaveRequest, deleteLeaveRequest,findLeaveRequestByuserId} = require("../controllers/leaveRequestControllers");

api.post('/addLeaveRequest', employeeAddLeaveRequest);
api.get('/getAllLeaveRequest', seeAllLeaveRequest);
api.post('/getLeaveRequestByid', findLeaveRequestByProvidedId);
api.put('/approveLeaveRequest/:id', approveLeaveRequest);
api.put('/RejectLeaveRequest/:id', rejectLeaveRequest);
api.delete('/DeleteLeaveRequest/:id', deleteLeaveRequest);
api.post('/LeaveDataByuserId',findLeaveRequestByuserId);

module.exports = api;