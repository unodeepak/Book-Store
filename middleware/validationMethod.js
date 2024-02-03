const validation = require("../middleware/validationSchema");
const formateData = (data) => {
  try {
    const parsedQuery = {};
    for (const key in data) {
      const value = data[key];

      if (value === "null") {
        parsedQuery[key] = null;
      } else if (value === "true") {
        parsedQuery[key] = true;
      } else if (value === "false") {
        parsedQuery[key] = false;
      } else if (value === "undefined") {
        parsedQuery[key] = undefined;
      } else if (value.startsWith("[") && value.endsWith("]")) {
        parsedQuery[key] = JSON.parse(value);
      } else if (value.startsWith("{") && value.endsWith("}")) {
        parsedQuery[key] = JSON.parse(value);
      } else if (!isNaN(value)) {
        parsedQuery[key] = +value;
      } else {
        parsedQuery[key] = value;
      }
    }

    return parsedQuery;
  } catch (error) {
    res.status(400).json({ error: "Invalid query parameters" });
  }
};

exports.createBookBody = async (req, res, next) => {
  const { error } = validation.createBookSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};

exports.updateBookDetailsBody = async (req, res, next) => {
  const { error } = validation.updateBookDetailsSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};

exports.signUpBody = async (req, res, next) => {
  const { error } = validation.signUpSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};

exports.signInBody = async (req, res, next) => {
  const { error } = validation.signInSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};

exports.pageBody = async (req, res, next) => {
  req.query = formateData(req.query);
  const { error } = validation.pageSchema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};

exports.buyBookBody = async (req, res, next) => {
  const { error } = validation.buyBookSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0]?.message, success: false });
  }

  next();
};