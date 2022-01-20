const Router = require('express').Router();
const Blogs = require('../Model/Blogs');
const isAuth = require('../Middleware/IsAuth');
const Mongoose = require('mongoose');
// Router.get('*', (req, res) => {
//   res.sendFile('Hello World');
// });

Router.get('/getBlog', async (req, res) => {
  const data = await Blogs.find({});
  // console.log(data);
  return res.status(200).json(data);
});
Router.get('/FetchBlog', async (req, res) => {
  console.log(req.query);
  const data = await Blogs.find({
    _id: req.query.id,
  });
  if (!data) return res.status(404).json({ message: 'Blog Not Found' });
  return res.status(200).json({
    blog: data,
    message: 'Blog Fetched',
  });
});
Router.post('/createBlog', isAuth, async (req, res) => {
  const data = req.body;
  const owner = req.user;
  const blog = await new Blogs({
    ...data,
    owner: owner,
  });
  await blog.save();
  return res.status(200).json({ blog: blog, message: 'Blog Created' });
});

Router.put('/putBlog', isAuth, async (req, res) => {
  const data = req.body;
  const owner = req.user;

  const blog = await Blogs.findOne({
    _id: data._id,
  });

  if (!blog) {
    return res.status(404).json({ message: 'Blog Not Found' });
  }
  if (Mongoose.mongo.ObjectId(blog.owner).toString() !== owner.toString()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log(data);
  blog.title = data.title;
  blog.description = data.description;
  blog.image = data.image;
  const Updated = await blog.save();
  console.log(Updated);
  return res.status(200).json({ blog: Updated, message: 'Blog Updated' });
});
Router.delete('/DeleteBlog', isAuth, async (req, res) => {
  // console.log(req.query);
  const data = await Blogs.findByIdAndDelete(req.query.id);
  if (!data) return res.status(404).json({ message: 'Blog Not Found' });
  return res.status(200).json({ _id: data._id, message: 'Blog Deleted' });
});
module.exports = Router;
