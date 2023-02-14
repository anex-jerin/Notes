const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require('../controllers/note');

router.route('/').get(getAllNotes).post(createNote).patch(updateNote);
router.route('/:id').delete(deleteNote);

 
module.exports = router;