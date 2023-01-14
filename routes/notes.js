const router = require("express").Router();
const NotesSchema = require("../models/Notes");
const authenticate = require("../middleware/authentication");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// validator
const validation = [
  body("title", "The Title must have at least 2 character").isLength({
    min: 2,
  }),
  body(
    "description",
    "The Description must have at least 15 character"
  ).isLength({
    min: 15,
  }),
];

// Route 1: Get all notes using: GET "/getuserId"
router.get("/getallnotes", authenticate, async (req, res) => {
  try {
    // Get user object_id from Notes model using foreign key method
    const userAllNotes = req.authUser;
    const allNotes = await Notes.find({ user: userAllNotes });
    res.json(allNotes);
  } catch (error) {
    console.log(error);
    res.json({ error: "something got wrong occur" });
  }
});

// Route 2: Create new notes using: POST "/createnotes"
router.post("/createnotes", validation, authenticate, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If user have not filled any field
    if (!title || !description) {
      return res.status(400).json({ error: "please fill all the field" });
    }

    // create a new note
    const newNotes = new NotesSchema({
      user: req.authUser,
      title: title,
      description: description,
      tag: tag,
    });

    const savedNotes = await newNotes.save();
    res.json({ success: savedNotes, msg: "Note has been saved" });
  } catch (error) {
    console.log(error);
    res.json({ error: "something got wrong occur" });
  }
});

// Route 3: Update all notes using: put "/update"
router.put("/update/:id", validation, authenticate, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If user have not filled any field
    if (!title || !description) {
      return res.status(400).json({ error: "please fill all the field" });
    }

    // Update Note
    const newNotes = {
      title: title,
      description: description,
      tag: tag,
    };

    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );

    // note doesn't exist
    if (!updatedNote) {
      return res.status(404).json({ error: "404 not found" });
    }

    // Fake user authenticate
    // if (updatedNote.user !== req.authUser) {
    //   return res.status(401).json({ error: "Not Allowed" });
    // }

    res.json({ success: updatedNote, msg: "Notes has been edited" });
  } catch (error) {
    res.json({ error: "something got wrong occur" });
  }
});

// Route 4: Delete note using: delete "/delete"
router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    // note doesn't exist
    if (!deletedNote) {
      return res.status(404).json({ error: "404 not found" });
    }

    // Fake user authenticate
    const deletedNoteId = deletedNote.user.toString();
    if (deletedNoteId == req.authUser) {
      return res.json({ success: deletedNote, msg: "Note has been deleted" });
    } else {
      return res.status(401).json({ error: "Not Allowed" });
    }
  } catch (error) {
    res.json({ error: "something got wrong occur" });
  }
});

module.exports = router;
