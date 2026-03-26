const calenders = require("../models/workingCalander");

//Create an api to get list of monthly calenders

async function allcalenders(req, res) {
    try {
    const allcalender = await calenders.find();
    res.status(201).json(allcalender);   
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

//Create an api to get 1 month calender.
async function monthCalender (req, res) {
  const {year, month } = req.body;
  console.log('Received Body:', req.body);
  if (!year || !month) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existing = await calenders.findOne({year, month });
    if (!existing) {
      return res.status(401).json({ message: "Calendar not exists for this month" });
    }
    res.status(201).json(existing);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function yearWeekend(req, res) {
  const { year } = req.body;

  try {
    const existing = await calenders.find({ year });

    if (!existing || existing.length === 0) {
      return res.status(400).json({ message: "Calendar not found for this year" });
    }

    // Filter only dayType === 0 from each document
    const weekendsOnly = existing.map(month => {
      return {
        month: month.month,
        year: month.year,
        dayCalander: month.dayCalander.filter(day => day.dayType === 0)
      };
    });

    res.status(200).json(weekendsOnly);
  } catch (err) {
    console.error("Error fetching weekends:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}





module.exports ={
                 allcalenders,
                 monthCalender,
                 yearWeekend 
                };