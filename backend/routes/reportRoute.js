const multer = require("multer");
const express = require("express");
const LabReport = require("../models/reportmodel");
const authenticateToken = require("../middleware/auth"); // Import middleware


const router = express.Router();

// Multer Storage (store in memory, not disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save Lab Report (Upload to Database)
router.post("/add",authenticateToken, upload.single("reportFile"), async (req, res) => {
  try {
    const { testDate, labName, description, condition } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Report file is required" });
    }

    const newReport = new LabReport({
      userId,
      testDate,
      reportFile: {
        data: req.file.buffer, 
        contentType: req.file.mimetype, 
      },
      labName,
      description,
      condition,
    });

    await newReport.save();
    res.status(201).json({ message: "Lab Report saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Lab Reports (Send Image as Base64)
router.get("/", authenticateToken, async (req, res) => {
    try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID missing." });
    }

      const reports = await LabReport.find({userId});
  
      const formattedReports = reports.map((report) => ({
        _id: report._id,
        testDate: report.testDate ? new Date(report.testDate).toISOString().split("T")[0] : null, // Ensuring proper date format
        labName: report.labName,
        description: report.description || "", // Avoiding undefined values
        condition: report.condition || "",
        reportFile:
          report.reportFile && report.reportFile.data
            ? `data:${report.reportFile.contentType};base64,${report.reportFile.data.toString("base64")}`
            : null,
      }));
  
      res.status(200).json(formattedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReport = await LabReport.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ message: "Lab report not found" });
        }

        res.status(200).json({ message: "Lab report deleted successfully" });
    } catch (error) {
        console.error("Error deleting lab report:", error);
        res.status(500).json({ message: "Server error" });
    }
});

  
 
  

module.exports = router;
