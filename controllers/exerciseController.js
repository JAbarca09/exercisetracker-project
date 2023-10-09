const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
// Response
// {"_id":"652382314c3ec20832c9fd1e","username":"Rekby","date":"Tue Aug 03 2021","duration":10,"description":"Heyo"}
// FIXME in reality a exercise is an object with a...
// description, duration and date
exports.createExercise = async (req, res) => {
  try {
    console.log(req.body);
    const exerciseObj = req.body;
    const { description, duration, date } = exerciseObj;
    const userId = exerciseObj[':_id'];
    const existingUser = await User.findById(userId);
    console.log(existingUser);

    const newExercise = new Exercise({
      username: existingUser.username,
      date,
      duration,
      description,
    });
    await newExercise.save();

    console.log(existingUser.username, date, duration, description);

    return res.status(201).json({
      username: existingUser.username,
      date,
      duration,
      description,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
