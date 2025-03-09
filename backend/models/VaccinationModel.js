const mongoose = require("mongoose");

const VaccinationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store user reference
    testDate: { type: Date, required: true }, 
    valDate: { type: Date, required: true }, 
    vaccinationFor: { type: String, required: true },
    vaccineName: { type: String, required: true },
    docName: { type: String, required: true },
    condition: { type: String },
  },
  { timestamps: true } // Auto add `createdAt` & `updatedAt`
);

const VaccinationReport = mongoose.model("VaccinationReport", VaccinationSchema);
module.exports = VaccinationReport;
