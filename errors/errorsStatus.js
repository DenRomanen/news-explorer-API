/* eslint-disable max-classes-per-file */
class BadRequesrError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}
module.exports = {
  BadRequesrError,
  NotFoundError,
  InternalServerError,
  ForbiddenError
};
