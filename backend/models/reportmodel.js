const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testDate: {
    type: String,
    required: true,
  },
  reportFile: {
    data: Buffer, // Store binary data
    contentType: String, // Store file type (e.g., image/png, image/jpeg)
  },
  labName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  condition: {
    type: String,
  },
});

module.exports = mongoose.model("LabReport", reportSchema);
