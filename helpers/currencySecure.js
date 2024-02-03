const aes256 = require("aes256");

exports.encrypt = (id, balance) => {
  return aes256.encrypt(id?.toString(), balance?.toString());
};

exports.decrypt = (id, balance) => {
  let wallet = aes256.decrypt(id?.toString(), balance);
  return +wallet;
};
