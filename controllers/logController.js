const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
const Log = require('../models/logModel');

exports.getUserLogs = async (req, res) => {
  const userId = req.params['_id'];

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const existingLog = await Log.findOne({ username: existingUser.username });

  if (!existingLog) {
    // If no log exists, create a new log
    const exercises = await Exercise.find({ username: existingUser.username });
    const exercise = exercises.map((element) => {
      return {
        description: element.description,
        duration: element.duration,
        date: element.date,
      };
    });

    const log = new Log({
      _id: userId,
      username: existingUser.username,
      count: exercise.length,
      log: exercise,
    });

    await log.save();
    return res.status(200).json(log);
  } else {
    const exercises = await Exercise.find({ username: existingUser.username });
    const exerciseCount = exercises.length;

    if (exerciseCount !== existingLog.count) {
      const updatedExerciseLog = exercises.map((element) => {
        return {
          description: element.description,
          duration: element.duration,
          date: element.date,
        };
      });

      existingLog.count = exerciseCount;
      existingLog.log = updatedExerciseLog;

      await existingLog.save();
      return res.status(200).json(existingLog);
    }

    return res.status(200).json(existingLog);
  }
};
