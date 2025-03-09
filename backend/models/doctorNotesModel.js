const mongoose = require("mongoose");

const DocNotesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store user reference
    testDate: { type: Date, required: true }, // Store date correctly
    hospitalName: { type: String, required: true },
    docName: { type: String, required: true },
    notes: { type: String },

  },
  { timestamps: true } // Auto add `createdAt` & `updatedAt`
);

const DocNotes = mongoose.model("DocNotes", DocNotesSchema);
module.exports = DocNotes;
