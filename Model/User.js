const Mongoose = require('mongoose');
const Scheme = Mongoose.Schema;
const User = new Scheme(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    refer: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = Mongoose.model('Users', User);
