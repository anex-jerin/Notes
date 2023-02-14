const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
noteSchema.plugin(autoIncrement, { inc_field: 'ticket', id:"ticketNums" });

module.exports = mongoose.model('Note', noteSchema);
