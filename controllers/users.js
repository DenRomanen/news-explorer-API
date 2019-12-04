const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { InternalServerError } = require('../errors/internalServer');

const userServerErrorRequest = (req, res, next) => {
  req
    .then((user) => {
      if (!user) {
        throw new InternalServerError('Произошла ошибка сервера');
      }
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch(next);
};

const getMe = (req, res) => {
  const owner = req.user._id;

  userServerErrorRequest(User.findById(owner), res);
};

const postUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(201).send({ name: user.name, email: user.email });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true });
      res.status(201).send({ token });
    })
    .catch(next);
};

module.exports = { login, postUser, getMe };
