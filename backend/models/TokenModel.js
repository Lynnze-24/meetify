const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    accId: {
      type: Number,
      require: [true, 'AccId Required!'],
    },
    googleId: {
      type: String,
      require: [true, 'GoogleId Required!'],
    },
    token: {
      type: String,
      require: [true, 'Required Token!'],
    },
    name: {
      type: String,
      require: [true, 'Required name!'],
    },
    pic: {
      type: String,
      require: [true, 'Required pic!'],
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;
