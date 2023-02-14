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
    if (
      !username
      //|| !Array.isArray(roles) ||
      // !roles.length ||
      // typeof active !== 'boolean'
    ) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    let user = await User.findById(id);

    if (!user) return res.status(401).json({ msg: 'user not found' });
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ msg: 'Duplicate username' });
    }
    user.username = username;
    user.roles = roles;
    user.active = active;
    console.log(user);
    const savedUser = await user.save();
    res.json({ msg: `${savedUser.username} updated` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Note.findOne({user:id})
    if(notes){
      return res.status(400).json({msg:'User has assigned notes'})
    }
    const user = await User.findByIdAndDelete(id);
    res.json({msg:`username ${user.username} with id ${user._id} is deleted`})
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser, createUser };
