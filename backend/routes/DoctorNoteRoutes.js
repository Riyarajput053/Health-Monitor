const express = require("express");
const DocNotes = require("../models/doctorNotesModel"); // Rename model if needed
const authenticateToken = require("../middleware/auth"); // Import middleware

const router = express.Router();

// Save Prescription (Upload to Database without Image)
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { testDate, hospitalName, docName, notes } = req.body;
    const userId = req.user._id; // Get user ID from token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const newNote = new DocNotes({
      userId, // Linking to the logged-in user
      testDate,
      hospitalName,
      docName,
      notes
      
    });

    await newNote.save();
    res.status(201).json({ message: "Note saved successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while saving Note." });
  }
});

// Get all Reports for a User
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const note = await DocNotes.find({ userId });
    res.json(note);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch reports." });
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await DocNotes.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting Note:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
