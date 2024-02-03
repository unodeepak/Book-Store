const express = require("express");
const route = express.Router();
const validate = require("../middleware/validationMethod");
const userCon = require("../controllers/userController");

route.post("/signup", validate.signUpBody, userCon.signUp);
route.post("/signIn", validate.signInBody, userCon.signIn);
route.post("/sendMailToUser", userCon.sendMailToUser);

module.exports = route;
