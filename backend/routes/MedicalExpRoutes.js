const multer = require("multer");
const express = require("express");
const MedExpense = require("../models/medicalExpenseModel");
const authenticateToken = require("../middleware/auth"); // Import middleware

const router = express.Router();

// Multer Storage (store in memory, not disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save Prescription (Upload to Database)
router.post("/add", authenticateToken, upload.single("bill"), async (req, res) => {
  try {
    const { testDate, hospitalName, paymentFor, paymentMode,amount, condition } = req.body;
    const userId = req.user._id; // Get user ID from token

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Bill image is required" });
    }

    const newBill = new MedExpense({
      userId, // Linking to the logged-in user
      testDate,
      bill: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      hospitalName,
      paymentFor,
      paymentMode,
      amount,
      condition,
    });

    await newBill.save();
    res.status(201).json({ message: "Bill saved successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while saving bill." });
  }
});

// Get Prescriptions for Logged-in User
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    const bills = await MedExpense.find({ userId });

    // Convert buffer data to Base64 URL
    const billImages = bills.map((bill) => ({
      _id: bill._id,
      testDate: bill.testDate,
      hospitalName: bill.hospitalName,
      amount: bill.amount,
      paymentFor: bill.paymentFor,
      paymentMode: bill.paymentMode,
      condition: bill.condition,
      bill: bill.bill
        ? `data:${bill.bill.contentType};base64,${bill.bill.data.toString("base64")}`
        : null, // Convert buffer to Base64 string
    }));

    res.json(billImages);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch bills." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;

      const deletedBill = await MedExpense.findByIdAndDelete(id);
      if (!deletedBill) {
          return res.status(404).json({ message: "Bill not found" });
      }

      res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
      console.error("Error deleting Bill:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
