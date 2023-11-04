const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
// Response
// {"_id":"652382314c3ec20832c9fd1e","username":"Rekby","date":"Tue Aug 03 2021","duration":10,"description":"Heyo"}
const isValidDate = (date) => {
  return !isNaN(new Date(date));
};

exports.createExercise = async (req, res) => {
  try {
    const userId = req.body[':_id'];
    const { description, duration, date } = req.body;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    let formattedDate;
    let DB_DATE;

    if (isValidDate(date)) {
      DB_DATE = new Date(date);
      formattedDate = new Date(date).toDateString();
    } else {
      DB_DATE = new Date(); // today's date
      formattedDate = DB_DATE.toDateString();
    }

    const newExercise = new Exercise({
      username: existingUser.username,
      description,
      duration,
      date: DB_DATE,
    });

    await newExercise.save();
    const newExerciseId = newExercise._id;

    return res.status(201).json({
      _id: newExerciseId,
      username: existingUser.username,
      date: formattedDate,
      duration,
      description,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
