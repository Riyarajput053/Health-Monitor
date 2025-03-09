const multer = require("multer");
const express = require("express");
const ImageReport = require("../models/ImageModel");
const authenticateToken = require("../middleware/auth"); // Import middleware

const router = express.Router();

// Multer Storage (store in memory, not disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save Prescription (Upload to Database)
router.post("/add", authenticateToken, upload.single("imageFile"), async (req, res) => {
  try {
    const { testDate, hospitalName, docName, description, condition } = req.body;
    const userId = req.user._id; // Get user ID from token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Prescription image is required" });
    }

    const newImage = new ImageReport({
      userId, // Linking to the logged-in user
      testDate,
      imageFile: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      hospitalName,
      docName,
      description,
      condition,
    });

    await newImage.save();
    res.status(201).json({ message: "Image saved successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while saving Image." });
  }
});


router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const images = await ImageReport.find({ userId });

    // Convert buffer data to Base64 URL
    const imagesHos = images.map((image) => ({
      _id: image._id,
      testDate: image.testDate,
      hospitalName: image.hospitalName,
      docName: image.docName,
      description: image.description,
      condition: image.condition,
      imageFile: image.imageFile
        ? `data:${image.imageFile.contentType};base64,${image.imageFile.data.toString("base64")}`
        : null, // Convert buffer to Base64 string
    }));

    res.json(imagesHos);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch image." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await ImageReport.findByIdAndDelete(id);
        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting Image:", error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
