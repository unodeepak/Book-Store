const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    balance: { type: String, required: [true, "Wallet status required"] },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", walletSchema);
module.exports = Wallet;
