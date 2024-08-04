const mongoose = require("mongoose");

const DP_CONNECT = (url) => {
  return mongoose.connect(url);
};

module.exports = DP_CONNECT;