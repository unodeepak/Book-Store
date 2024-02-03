const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    purchaseId: {
      type: mongoose.Types.ObjectId,
      ref: "Purchase",
      default: null
    },
    amount: { type: Number, required: [true, "amount is required"] },
    bookId: { type: mongoose.Types.ObjectId, ref: "Book", default: null },
    message: { type: String, default: null },
    amountType: { type: String, enum: ["credited", "debited"], required: true },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
