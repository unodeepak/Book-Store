require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cron = require("node-schedule");

const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const walletRoute = require("./routes/walletRoute");
const generateReport = require("./helpers/generateReport");

app.use(cors("*"));
app.use(express.json({}));
const PORT = process.env.PORT || 5006;

app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/wallet", walletRoute);

/* This is send the weekly report to Author */
cron.scheduleJob("0 9 * * 0", () => {
  generateReport()
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.log("Error in mongoDB connection ", err);
    return false;
  }
};
connectDB();
