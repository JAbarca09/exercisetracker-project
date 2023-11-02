const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    const usersArray = allUsers.map((user) => ({
      _id: user._id,
      username: user.username,
      __v: user.__v,
    }));

    res.status(200).json(usersArray);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const username = req.body.username;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already registerd' });
    }

    const user = new User({ username });
    await user.save();

    return res.status(201).json({
      username: user.username,
      _id: user._id,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
