const Notice = require('../models/Notice');
//Create an api to Post an notice add a new notice in db

async function postNotice(req, res){
  const {title, message } = req.body;

  try {
    const newNotice = new Notice({title, message });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully', data: newNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Create an api to get all notice from database
async function getAllNotices (req,res){
     try {
        const getAllNotice = await Notice.find({});
        res.json(getAllNotice);
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
     }
}

module.exports ={postNotice,getAllNotices};
