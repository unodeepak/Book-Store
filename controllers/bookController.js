const publisher = require("../emails/publisher");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

exports.createBook = async (req, res) => {
  try {
    const { description, title, price } = req.body;
    req.body.userId = req.user._id;
    await Book.create(req.body);

    /* Send the mail to all Normal user */
    const users = await User.find({ role: 2 });
    let data = [];

    for (let user of users) {
      let item = {
        to: user?.email,
        subject: "New course launch",
        body: `${title}`,
      };
      data.push(item);
    }
    publisher(data);

    return res
      .status(201)
      .json({ msg: "Book created successfully", success: true });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.updateBookDetails = async (req, res) => {
  try {
    const { description, title, price, bookId } = req.body;
    const isExist = await Book.findById(bookId);
    if (!isExist) {
      return res.status(400).json({ msg: "Invalid bookId", success: false });
    }

    await Book.findByIdAndUpdate(bookId, {
      $set: {
        description,
        title,
        price,
      },
    });

    return res
      .status(200)
      .json({ msg: "Book details updated successfully", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);
    console.log({ data });

    return res
      .status(200)
      .json({ msg: "Book deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const data = await Book.find({}, { userId: 0 }).skip(skip).limit(limit);

    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);

    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getBooksByUserId = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user._id;

    const data = await Book.find({ userId }).skip(skip).limit(limit);

    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
