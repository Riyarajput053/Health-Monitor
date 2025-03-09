const multer = require("multer");
const express = require("express");
const PrescriptionReport = require("../models/PrescriptionModel");
const authenticateToken = require("../middleware/auth"); // Import middleware

const router = express.Router();

// Multer Storage (store in memory, not disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save Prescription (Upload to Database)
router.post("/add", authenticateToken, upload.single("prescriptionFile"), async (req, res) => {
  try {
    const { testDate, hospitalName, docName, description, condition } = req.body;
    const userId = req.user._id; // Get user ID from token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Prescription image is required" });
    }

    const newPrescription = new PrescriptionReport({
      userId, // Linking to the logged-in user
      testDate,
      prescriptionFile: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      hospitalName,
      docName,
      description,
      condition,
    });

    await newPrescription.save();
    res.status(201).json({ message: "Prescription saved successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while saving prescription." });
  }
});

// Get Prescriptions for Logged-in User
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const prescriptions = await PrescriptionReport.find({ userId });

    // Convert buffer data to Base64 URL
    const prescriptionsWithImages = prescriptions.map((prescription) => ({
      _id: prescription._id,
      testDate: prescription.testDate,
      hospitalName: prescription.hospitalName,
      docName: prescription.docName,
      description: prescription.description,
      condition: prescription.condition,
      prescriptionFile: prescription.prescriptionFile
        ? `data:${prescription.prescriptionFile.contentType};base64,${prescription.prescriptionFile.data.toString("base64")}`
        : null, // Convert buffer to Base64 string
    }));

    res.json(prescriptionsWithImages);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch prescriptions." });
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;

      const deletedPres = await PrescriptionReport.findByIdAndDelete(id);
      if (!deletedPres) {
          return res.status(404).json({ message: "Prescription not found" });
      }

      res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
      console.error("Error deleting Prescription:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
