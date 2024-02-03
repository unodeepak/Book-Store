const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtAdminExpire = process.env.JWT_EXPIRE;
const jwtUserExpire = process.env.JWT_USER_EXPIRE;

const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtAdminRefreshExpire = process.env.JWT_REFRESH_EXPIRE;
const jwtUserRefreshExpire = process.env.JWT_USER_REFRESH_EXPIRE;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: true,
    },
    password: { type: String, required: true },
    role: { type: Number, default: 2, enum: [0, 1, 2] },
    /* 0: Admin, 1: Author, 2: Normal User */
  },
  { timestamps: true }
);

/* Now we added some mongoose middleware */
userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = function (
  userType = "nUser",
  tokenType = "accessToken"
) {
  if (userType == "nUser") {
    if (tokenType == "accessToken") {
      return jwt.sign({ id: this.id }, jwtSecret, {
        expiresIn: jwtUserExpire,
      });
    } else {
      return jwt.sign({ id: this.id }, jwtRefreshSecret, {
        expiresIn: jwtUserRefreshExpire,
      });
    }
  } else {
    if (tokenType == "accessToken") {
      return jwt.sign({ id: this.id }, jwtSecret, {
        expiresIn: jwtAdminExpire,
      });
    } else {
      return jwt.sign({ id: this.id }, jwtRefreshSecret, {
        expiresIn: jwtAdminRefreshExpire,
      });
    }
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
