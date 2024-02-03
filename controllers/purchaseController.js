const Books = require("../models/bookModel");
const Purchase = require("../models/purchaseModel");
const Wallet = require("../models/walletModel");
const Transaction = require("../models/transactionModel");
const { encrypt, decrypt } = require("../helpers/currencySecure");
const sendMail = require("../helpers/sendMail");

exports.buyBook = async (req, res) => {
  try {
    const { bookId, qty } = req.body;
    const isExist = await Books.findById(bookId);
    if (!isExist) {
      return res.status(400).json({ msg: "Invalid bookId", success: false });
    }

    /* verifying user Balance */
    const userId = req.user._id;
    const walletData = await Wallet.findOne({ userId });
    let balance = decrypt(userId, walletData?.balance);

    let totalBalance = isExist?.price * qty;
    if (balance < totalBalance) {
      return res
        .status(402)
        .json({ msg: "Insufficient Balance", success: false });
    }

    /* Transaction Data creation */
    const data = await Purchase.create({
      bookId,
      userId,
      price: totalBalance,
      quantity: qty,
    });

    await Transaction.create({
      userId,
      purchaseId: data?._id,
      amount: totalBalance,
      amountType: "debited",
      status: "success",
    });

    balance -= totalBalance;
    walletData.balance = encrypt(userId, balance);
    await walletData.save();

    /* Start the Transaction for Author  */
    const author = await Books.findById(bookId).select("userId");
    const authorWallet = await Wallet.findOne({ userId: author?.userId });
    const authorBalance =
      decrypt(author?.userId, authorWallet?.balance) + totalBalance;
    authorWallet.balance = encrypt(author?.userId, authorBalance);
    await authorWallet.save();

    await Transaction.create({
      userId: author?.userId,
      purchaseId: data?._id,
      bookId,
      amount: totalBalance,
      amountType: "credited",
      status: "success",
    });

    let mailTemplate = {
      to: req.user.email,
      subject: "Purchase Details of book",
      body: `Your book name are ${isExist?.title} and price is ${isExist?.price}`,
    };
    sendMail(mailTemplate);
    
    return res
      .status(200)
      .json({ msg: "Transaction successful", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
