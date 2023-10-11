const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
// Response
// {"_id":"652382314c3ec20832c9fd1e","username":"Rekby","date":"Tue Aug 03 2021","duration":10,"description":"Heyo"}

//FIXME date should be translated from YYYY-MM-DD 2020-03-09 to EX: Tue Aug 03 2021
exports.createExercise = async (req, res) => {
  try {
    const userId = req.body[':_id'];
    const { description, duration, date } = req.body;
    const existingUser = await User.findById(userId);

    // TODO Validate user id
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newExercise = new Exercise({
      userId,
      description,
      duration,
      date,
    });

    await newExercise.save();

    return res.status(201).json({
      userId,
      description,
      duration,
      date,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
