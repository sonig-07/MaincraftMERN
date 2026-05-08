const express = require("express");

const router = express.Router();

const Note = require("../models/Note");

const auth = require("../middleware/auth");

const validateNote =
require("../middleware/validateNote");


// CREATE NOTE
router.post(

  "/notes",

  auth,

  validateNote,

  async (req, res) => {

    try {

      const note =
        new Note({

          title:
            req.body.title,

          content:
            req.body.content,

          tags:
            req.body.tags || [],

          owner:
            req.user.id

        });

      await note.save();

      res.json(note);

    } catch (err) {

      res.status(500).json({

        message: err.message

      });

    }
});


// GET USER NOTES
router.get(

  "/notes",

  auth,

  async (req, res) => {

    try {

      const notes =
        await Note.find({

          owner: req.user.id

        }).sort({

          createdAt: -1

        });

      res.json(notes);

    } catch (err) {

      res.status(500).json({

        message: err.message

      });

    }
});


// UPDATE NOTE
router.put(

  "/notes/:id",

  auth,

  validateNote,

  async (req, res) => {

    try {

      const note =
        await Note.findById(
          req.params.id
        );

      if (!note) {

        return res.status(404).json({

          message: "Note not found"

        });
      }

      // OWNER CHECK
      if (
        note.owner.toString()
        !== req.user.id
      ) {

        return res.status(403).json({

          message: "Forbidden"

        });
      }

      note.title =
        req.body.title;

      note.content =
        req.body.content;

      note.tags =
        req.body.tags || [];

      await note.save();

      res.json(note);

    } catch (err) {

      res.status(500).json({

        message: err.message

      });

    }
});


// DELETE NOTE
router.delete(

  "/notes/:id",

  auth,

  async (req, res) => {

    try {

      const note =
        await Note.findById(
          req.params.id
        );

      if (!note) {

        return res.status(404).json({

          message: "Note not found"

        });
      }

      // OWNER CHECK
      if (
        note.owner.toString()
        !== req.user.id
      ) {

        return res.status(403).json({

          message: "Forbidden"

        });
      }

      await note.deleteOne();

      res.json({

        message:
          "Note deleted"

      });

    } catch (err) {

      res.status(500).json({

        message: err.message

      });

    }
});

module.exports = router;