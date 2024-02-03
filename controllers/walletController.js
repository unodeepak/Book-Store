const Wallet = require("../models/walletModel");
const { encrypt, decrypt } = require("../helpers/currencySecure");
const Transaction = require("../models/transactionModel");

exports.addMoneyToWallet = async (req, res) => {
  try {
    let balance = +req.body.balance;
    if (isNaN(balance)) {
      return res
        .status(400)
        .json({ msg: "Plz enter correct balance", success: false });
    }

    const userId = req.user._id;
    const walletData = await Wallet.findOne({ userId });
    let walletBalance = decrypt(userId, walletData?.balance) + balance;
    walletBalance = encrypt(userId, walletBalance);

    await Wallet.findOneAndUpdate(
      { userId },
      { $set: { balance: walletBalance } }
    );

    await Transaction.create({
      userId,
      amount: balance,
      amountType: "credited",
      status: "success",
      message: "Money added on Wallet",
    });

    return res.status(200).json({ msg: "Amount added", success: false });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
