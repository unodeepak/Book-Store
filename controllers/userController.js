const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Wallet = require("../models/walletModel");
const { encrypt, decrypt } = require("../helpers/currencySecure");
const Transaction = require("../models/transactionModel");
const publisher = require("../emails/publisher");
const sendMail = require("../helpers/sendMail");
const generateReport = require("../helpers/generateReport");

const getUserToken = (userType, model) => {
  let token;
  if (["author", "admin"]?.includes(userType)) {
    token = {
      accessToken: model.getToken("author"),
      refreshToken: model.getToken("author", "refreshToken"),
    };
  } else {
    token = {
      accessToken: model.getToken(),
      refreshToken: model.getToken("", "refreshToken"),
    };
  }

  return token;
};

exports.signUp = async (req, res) => {
  try {
    const { email, userType, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ msg: `email id ${email} already exist`, success: false });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    if (userType == "author") {
      req.body.role = 1;
    }

    const data = await User.create(req.body);

    /* We are creating wallet for user after the Successfully user Create */
    await Wallet.create({
      userId: data?._id,
      balance: encrypt(data?._id, 100),
    });

    /* Create Transaction History */
    await Transaction.create({
      userId: data?._id,
      amount: 100,
      message: "Signup bonus",
      amountType: "credited",
      status: "success",
    });

    let token = getUserToken(userType, data);
    return res.status(201).json({ data, token, success: true });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(400).json({ msg: "Invalid email", success: false });
    }

    const match = await data.matchPassword(password);
    if (match) {
      let token = getUserToken(
        [0, 1]?.includes(data?.role) ? "author" : "nUser",
        data
      );

      return res.status(200).json({ data, token, success: true });
    } else {
      return res
        .status(403)
        .json({ msg: "Invalid credential", success: false });
    }
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.sendMailToUser = async (req, res) => {
  try {
    // const data = {
    //   to: "deepak.keshri@psiborg.in",
    //   subject: "Subject 1",
    //   body: "Body 1",
    // };

    // publisher(data)
    const data = await generateReport();
    return res.status(200).json({ data, msg: "Success", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
