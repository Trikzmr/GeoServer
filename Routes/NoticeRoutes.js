const express =require("express");
const api =express.Router();
const {postNotice,getAllNotices} = require("../controllers/NoticeControllers");

api.post("/addNotice",postNotice);
api.get("/getNotice",getAllNotices);

module.exports=api;