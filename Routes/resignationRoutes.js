const express = require("express");
const api = express.Router();

const { addNewResignation, getAllRegistration, particularUserRegistration,  } = require("../controllers/resignationController");

api.post('/addResignationLatter', addNewResignation);
api.get('/getResignationLatter', getAllRegistration);
api.get('/getResignationLatterbyuser/:userName', particularUserRegistration);



module.exports = api;