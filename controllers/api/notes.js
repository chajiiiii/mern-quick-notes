const Note = require("../../models/note");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const userId = req.user._id;
    console.log("userId:", userId); // Log userId

    const notes = await Note.find({ user: userId });
    console.log("notes:", notes); // Log notes
    res.json(notes);
  } catch (err) {
    console.error("Database Error:", err);
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
  }
}

async function create(req, res) {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    const newNote = new Note({
      text: text,
      user: userId,
    });

    await newNote.save();
    res.json(newNote);
  } catch (err) {
    console.error("create error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
