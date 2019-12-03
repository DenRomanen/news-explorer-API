const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnauthorizedError('Необходима авторизация.');
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    const err = new Error();
    err.statusCode = 401;

    next(err);
  }
  req.user = payload;
  return next();
};
