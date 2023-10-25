const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
// Response
// {"_id":"652382314c3ec20832c9fd1e","username":"Rekby","date":"Tue Aug 03 2021","duration":10,"description":"Heyo"}
exports.createExercise = async (req, res) => {
  try {
    const userId = req.body[':_id'];
    const { description, duration, date } = req.body;
    const DATE = new Date(date);
    const formattedDate = DATE.toDateString();
    const existingUser = await User.findById(userId);

    // TODO Validate user id
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newExercise = new Exercise({
      username: existingUser.username,
      description,
      duration,
      date: formattedDate,
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
