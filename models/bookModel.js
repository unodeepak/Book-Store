const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    description: { type: String, default: null },
    title: { type: String, default: null },
    price: { type: Number, min: 100, max: 1000, required: true },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
