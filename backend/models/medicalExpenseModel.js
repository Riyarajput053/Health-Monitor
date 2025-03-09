const mongoose = require("mongoose");

const mediExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Store user reference
    testDate: { type: Date, required: true }, // Store date correctly
    bill: {
      data: { type: Buffer, required: true }, // Ensure file data is required
      contentType: { type: String, required: true },
    },
    hospitalName: { type: String, required: true },
    paymentFor: { type: String, required: true },
    paymentMode: { type: String, required: true },
    amount: { type: Number, required: true },
    condition: { type: String },
  },
  { timestamps: true } // Auto add `createdAt` & `updatedAt`
);

const MedExpense = mongoose.model("MedExpense", mediExpenseSchema);
module.exports = MedExpense;
