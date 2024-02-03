const publisher = require("../emails/publisher");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const moment = require("moment");

/**
 * Generate the weekly Report and send to Author
 * @returns boolean
 */
const generateReport = async () => {
  const users = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(moment().subtract(7, "days").format("YYYY-MM-DD")),
          $lte: new Date(moment().add(1, "days").format("YYYY-MM-DD")),
        },
        status: "success",
        amountType: "credited",
        bookId: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$userId",
        count: { $sum: 1 },
        amount: { $sum: "$amount" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $match: {
        userData: { $ne: null },
        "userData.role": 1,
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        amount: 1,
        user: {
          userId: { $arrayElemAt: ["$userData._id", 0] },
          email: { $arrayElemAt: ["$userData.email", 0] },
          name: { $arrayElemAt: ["$userData.name", 0] },
        },
      },
    },
  ]);

  let data = [];
  for (let user of users) {
    let emailTemplate = {
      to: user?.user?.email,
      subject: "Weekly Report",
      body: `You sold total books ${user?.count} and total revenued ${user?.amount}.`,
    };
    data.push(emailTemplate);
  }

  publisher(data);
  return true;
};

module.exports = generateReport;
