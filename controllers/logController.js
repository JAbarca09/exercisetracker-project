const User = require('../models/userModel');
const Log = require('../models/logModel');

exports.getUserLogs = async (req, res) => {
  const userId = req.params[':_id'];

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Found a user now check if they have a log
  const existingLog = await Log.findOne({ username: existingUser.username });
  if (!existingLog) {
    return res.status(404).json({ message: 'User has no log!' });
  }
  // Create one if needed
  // Update if needed

  return res.status(200).json({ message: 'Hello World' });
};
