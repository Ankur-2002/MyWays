const Mongoose = require('mongoose');
const Scheme = Mongoose.Schema;

const Blogs = new Scheme(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model('Blogs', Blogs);
