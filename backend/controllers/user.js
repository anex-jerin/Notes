const User = require('../models/User');
const Note = require('../models/Notes');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    if (!username || !password || !Array.isArray(roles) || !roles.length)
      return res.status(400).json({ msg: 'All fields are required' });
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) return res.status(409).json({ msg: 'Duplicate' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { username, password: hashedPassword, roles };
    const user = await User.create(data);
    if (!user) return res.status(400).json({ msg: 'invalid data' });
    res.status(201).json(`New user ${username} created`);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select('-password').lean();
    if (!user) return res.status(400).json({ msg: 'No users found' });
    // if (user.length === 0) return res.status(201).json({ msg: 'no users' });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    // const { id } = req.params;
    const { username, roles, id, active } = req.body;
    if (!username || !password || !Array.isArray(roles) || !roles.length || typeof(active) !==Boolean)
      return res.status(400).json({ msg: 'All fields are required' });
    const user = User.findById(id).exec();

    if(!user) 

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findByIdAndDelete(id);
    res.json(user.username);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser, createUser };
