const express = require("express");
const route = express.Router();
const bookCon = require("../controllers/bookController");
const checkAuth = require("../middleware/checkAuth");
const validate = require("../middleware/validationMethod");

route.post(
  "/createBook",
  checkAuth("author"),
  validate.createBookBody,
  bookCon.createBook
);

route.post(
  "/updateBookDetails",
  checkAuth("author"),
  validate.updateBookDetailsBody,
  bookCon.updateBookDetails
);

route.post("/deleteBook/:bookId", checkAuth("author"), bookCon.deleteBook);
route.get("/getBookById/:bookId", checkAuth(), bookCon.getBookById);
route.get(
  "/getBooksByUserId",
  checkAuth("author"),
  validate.pageBody,
  bookCon.getBooksByUserId
);
route.get("/getBooks", checkAuth(), validate.pageBody, bookCon.getBooks);

module.exports = route;
