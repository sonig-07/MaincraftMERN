const express = require("express");

const router = express.Router();

const Note = require("../models/Note");

const auth =
require("../middleware/auth");

const admin =
require("../middleware/admin");

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


// GET NOTES
// SEARCH + PAGINATION

router.get(

  "/notes",

  auth,

  async (req, res) => {

    try {

      const search =
        req.query.search || "";

      const page =
        parseInt(req.query.page) || 1;

      const limit = 5;

      const skip =
        (page - 1) * limit;

      const notes =
        await Note.find({

          owner: req.user.id,

          $or: [

            {
              title: {
                $regex: search,
                $options: "i"
              }
            },

            {
              content: {
                $regex: search,
                $options: "i"
              }
            }

          ]

        })

        .sort({
          createdAt: -1
        })

        .skip(skip)

        .limit(limit);

      const total =
        await Note.countDocuments({

          owner: req.user.id,

          $or: [

            {
              title: {
                $regex: search,
                $options: "i"
              }
            },

            {
              content: {
                $regex: search,
                $options: "i"
              }
            }

          ]

        });

      res.json({

        notes,

        currentPage: page,

        totalPages:
          Math.ceil(total / limit)

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error"

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


// ADMIN
// VIEW ALL NOTES

router.get(

  "/admin/notes",

  auth,

  admin,

  async (req, res) => {

    try {

      const notes =
        await Note.find()

        .populate(
          "owner",
          "name email"
        )

        .sort({
          createdAt: -1
        });

      res.json(notes);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error"

      });

    }
});

module.exports = router;