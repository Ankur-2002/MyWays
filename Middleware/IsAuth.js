const Router = require('express').Router();
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'asdflusidf978p34yufsadbhfjlhi34y6cn8ye8r';
Router.use(async (req, res, next) => {
  console.log(req.headers);
  const Auth = req.headers.authorization;
  if (!Auth) return res.status(401).json({ message: 'Unauthorized' });
  const token = Auth.split(' ')[1];
  try {
    const verity = await JWT.verify(token, JWT_SECRET);
    if (+verity.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token Expired' });
    }
    req.user = verity.userId;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  // console.log(req.user);
  const secret = process.env.SECRET;
  next();
});
module.exports = Router;
