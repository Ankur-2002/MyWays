const express = require('express');
const BodyParser = require('body-parser');
const Path = require('path');
const User = require('./Controllers/User');
const Monogose = require('mongoose');
const Blogs = require('./Controllers/Blogs');
const app = express();
app.use(BodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(Path.join(__dirname, 'frontend/build')));
app.use(BodyParser.json());
Monogose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(res => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
    // sdf
  });
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET ,POST ,DELETE ,PATCH ,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') return res.json({}).status(200);
  next();
});

app.use('/api/user', User);
app.use('/api/blogs', Blogs);
app.get('*', (req, res) => {
  res.sendFile(Path.join(__dirname + '/frontend/build/index.html'));
});
