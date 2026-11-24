const express = require("express");

const auth = require("../middleware/auth");
const Note = require("../models/Note");

const router = express.Router();

// CREATE NOTE

router.post("/", auth, async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      owner: req.user.id
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// GET NOTES

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.user.id
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;