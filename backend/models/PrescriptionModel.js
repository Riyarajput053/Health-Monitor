const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store user reference
    testDate: { type: Date, required: true }, // Store date correctly
    prescriptionFile: {
      data: { type: Buffer, required: true }, // Ensure file data is required
      contentType: { type: String, required: true },
    },
    hospitalName: { type: String, required: true },
    docName: { type: String, required: true },
    description: { type: String },
    condition: { type: String },
  },
  { timestamps: true } // Auto add `createdAt` & `updatedAt`
);

const PrescriptionReport = mongoose.model("PrescriptionReport", PrescriptionSchema);
module.exports = PrescriptionReport;
