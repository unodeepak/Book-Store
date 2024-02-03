const express = require("express");
const route = express.Router();
const validate = require("../middleware/validationMethod");
const walletCon = require("../controllers/walletController");
const checkAuth = require("../middleware/checkAuth");

route.post("/addMoneyToWallet", checkAuth(), walletCon.addMoneyToWallet);

module.exports = route;
