const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
const Log = require('../models/logModel');

exports.getUserLogs = async (req, res) => {
  const userId = req.params['_id'];

  const existingUser = await User.findById(userId);
  console.log(existingUser);

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Found a user now check if they have a log
  const existingLog = await Log.findOne({ username: existingUser.username });
  if (!existingLog) {
    // TODO create a log
    const exercises = await Exercise.find({ username: existingUser.username });
    const exercise = exercises.map((element) => {
      return {
        description: element.description,
        duration: element.duration,
        date: element.date,
      };
    });
    console.log(exercise);
    // Create one if needed
    const log = new Log({
      _id: userId,
      username: existingUser.username,
      count: exercise.length,
      log: exercise,
    });

    await log.save();
    return res.status(200).json(log);
  }
  // TODO check if the log needs to be updated
  // TODO Update the log

  return res.status(200).json({ message: 'Hello World' });
};
