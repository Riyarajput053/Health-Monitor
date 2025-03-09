const express = require("express");
const VaccinationReport = require("../models/VaccinationModel"); // Rename model if needed
const authenticateToken = require("../middleware/auth"); // Import middleware

const router = express.Router();

// Save Prescription (Upload to Database without Image)
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { testDate, valDate, vaccinationFor, vaccineName, docName, condition  } = req.body;
    const userId = req.user._id; // Get user ID from token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const newVaccine = new VaccinationReport({
      userId, // Linking to the logged-in user
      testDate,
      valDate,
      vaccinationFor,
      vaccineName,
      docName,
      condition
      
    });

    await newVaccine.save();
    res.status(201).json({ message: "Vaccination information saved successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while saving vaccination information." });
  }
});

// Get all Reports for a User
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const vaccination = await VaccinationReport.find({ userId });
    res.json(vaccination);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch reports." });
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;

      const deletedvaccine = await VaccinationReport.findByIdAndDelete(id);
      if (!deletedvaccine) {
          return res.status(404).json({ message: "Vaccination not found" });
      }

      res.status(200).json({ message: "Vaccination deleted successfully" });
  } catch (error) {
      console.error("Error deleting Vaccination:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
