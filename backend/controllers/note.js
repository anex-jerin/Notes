const Note = require('../models/Notes');

const createNote = async (req, res) => {
  try {
    const { user, title, text, completed } = req.body;
    if (!user || !title || !text || !completed)
      return res.status(401).json({ msg: 'all fields are required' });
    const note = await Note.create({ data, title, text, completed });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (!notes) return res.status(401).json({ msg: 'no notes available' });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ msg: 'id not found' });
    const note = await Note.findByIdAndDelete(id);
    res.json({ msg: `note with title ${note.title} deleted` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const updateNote = async (req, res) => {
  try {
    const { id, user, title, text, completed } = req.body;
    if (!id || !user || !title || !text || !completed)
      return res.status(401).json({ msg: 'all fields are required' });
    const note = Note.findById(id);
    note.title = title;
    note.text = text;
    note.completed = completed;
    const savedUser = await note.save();
    res.json({msg:`Note with title ${savedUser.title} updated`})
  } catch (err) {
    res.status(500).json({ msg: err.message }); 
  }
};


module.exports = {getAllNotes,deleteNote,updateNote,createNote}