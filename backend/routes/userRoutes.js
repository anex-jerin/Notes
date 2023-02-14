const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user');

router.route('/').get(getAllUsers).post(createUser).patch(updateUser);
router.route('/:id').delete(deleteUser)

module.exports = router;
