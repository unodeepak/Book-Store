const express = require("express");
const route = express.Router();
const validate = require("../middleware/validationMethod");
const purchaseCon = require("../controllers/purchaseController");
const checkAuth = require("../middleware/checkAuth");

route.post("/buyBook", checkAuth(), validate.buyBookBody, purchaseCon.buyBook);

module.exports = route;
