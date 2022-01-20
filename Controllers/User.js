const JWT = require('jsonwebtoken');
const JWT_SECRET = 'asdflusidf978p34yufsadbhfjlhi34y6cn8ye8r';
const Router = require('express').Router();
const User = require('../Model/User');
Router.post('/check', async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const data = await JWT.verify(body.Token, JWT_SECRET);
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      res.status(400).send({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User found successfully',
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid token',
    });
  }
});
Router.post('/login', async (req, res) => {
  const body = req.body;
  console.log(body);
  const user = await User.findOne({
    email: body.Email,
  });
  if (!user) {
    return res.json({
      message: 'User not found',
    });
  }
  if (user.password !== body.Password) {
    return res.json({
      message: 'Wrong password',
    });
  }
  const Token = await JWT.sign(
    {
      userId: user._id,
    },
    'asdflusidf978p34yufsadbhfjlhi34y6cn8ye8r',
    {
      expiresIn: '7d',
    }
  );
  return res.json({
    message: 'Login Success',
    token: Token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

Router.post('/register', async (req, res) => {
  const body = req.body;
  console.log(body);
  const user = await User.findOne({
    email: body.Email,
  });
  if (user) {
    return res.json({
      message: 'User already exists',
    });
  }
  const newUser = await new User({
    username: body.Name,
    email: body.Email,
    password: body.Password,
    phone: body.Phone,
    refer: body.Refer,
  });
  await newUser.save();
  const Token = await JWT.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return res.json({
    message: 'Register Success',
    token: Token,
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

module.exports = Router;
