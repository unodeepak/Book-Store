const joi = require("joi");

const page = {
  page: joi.number().min(1).required(),
  limit: joi.number().min(1).required(),
};
const idFormat = joi.string().regex(/^[0-9a-fA-f]{24}$/);
const dateFormat = joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/);

exports.createBookSchema = joi.object({
  description: joi.string().required(),
  title: joi.string().required(),
  price: joi.number().min(100).max(1000).required(),
});

exports.updateBookDetailsSchema = joi.object({
  description: joi.string().required(),
  title: joi.string().required(),
  price: joi.number().required(),
  bookId: idFormat.required(),
});

exports.signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
  userType: joi.string().valid("nUser", "author").required(),
});

exports.signInSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().required(),
});

exports.pageSchema = joi.object({
...page
});

exports.buyBookSchema = joi.object({
  bookId: idFormat.required(),
  qty: joi.number().min(1).required(),
});