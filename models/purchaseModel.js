const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Types.ObjectId, ref: "Book" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    purchaseDate: { type: Date, default: Date.now },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("purchase", purchaseSchema);
module.exports = Purchase;
