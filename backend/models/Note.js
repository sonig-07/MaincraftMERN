const mongoose = require("mongoose");

const NoteSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    tags: [String],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  }, {

    timestamps: true

  });

  NoteSchema.index({
  title: "text",
  content: "text"
});

module.exports =
  mongoose.model(
    "Note",
    NoteSchema
  );