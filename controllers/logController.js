const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
const Log = require('../models/logModel');

// Example query
// http://localhost:3000/api/users/6520e2304efe5e4f2ac92687/logs?from=2020-01-01&to=2021-01-01&limit=1

exports.getUserLogs = async (req, res) => {
  const userId = req.params['_id'];
  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const existingLog = await Log.findOne({ username: existingUser.username });
  let responseLog; // The whole log
  let responseLogs; // log that makes up the key "log"
  if (!existingLog) {
    // If no log exists, create a new log
    let exercisesQuery = { username: existingUser.username };

    if (from && to) {
      exercisesQuery.date = { $gte: from, $lte: to };
    } else if (from) {
      exercisesQuery.date = { $gte: from };
    } else if (to) {
      exercisesQuery.date = { $lte: to };
    }

    let exercises = await Exercise.find(exercisesQuery);

    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }

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

    responseLogs = exercise.map((element) => {
      return {
        description: element.description,
        duration: element.duration,
        date: element.date.toDateString(),
      };
    });

    responseLog = {
      _id: userId,
      username: existingUser.username,
      count: exercise.length,
      log: responseLogs,
    };
    responseLog.log = responseLogs;

    return res.status(200).json(responseLog);
  } else {
    let exercisesQuery = { username: existingUser.username };

    if (from && to) {
      exercisesQuery.date = { $gte: from, $lte: to };
    } else if (from) {
      exercisesQuery.date = { $gte: from };
    } else if (to) {
      exercisesQuery.date = { $lte: to };
    }

    let exercises = await Exercise.find(exercisesQuery);

    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }

    const exerciseCount = exercises.length;

    if (exerciseCount !== existingLog.count) {
      // Another task was created
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

      responseLogs = existingLog.log.map((element) => {
        return {
          description: element.description,
          duration: element.duration,
          date: element.date.toDateString(),
        };
      });

      responseLog = {
        _id: userId,
        username: existingUser.username,
        count: exerciseCount,
        log: responseLogs,
      };
      responseLog.log = responseLogs;

      return res.status(200).json(responseLog);
    }
    // nothing has changed retrieve log
    responseLogs = existingLog.log.map((element) => {
      return {
        description: element.description,
        duration: element.duration,
        date: element.date.toDateString(),
      };
    });

    responseLog = {
      _id: userId,
      username: existingUser.username,
      count: existingLog.count,
      log: responseLogs,
    };
    responseLog.log = responseLogs;

    return res.status(200).json(responseLog);
  }
};
