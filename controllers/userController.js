const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ allUsers });
  } catch (err) {
    console.error('Could not get all users:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const username = req.body.username;
  try {
    // const existingUser = User.findOne({ username });
    // if (existingUser) {
    //   return res.status(409).json({ message: 'Username already registerd' });
    // }

    const user = new User({ username: username });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
