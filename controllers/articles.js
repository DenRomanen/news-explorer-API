const Article = require('../models/article');

const { BadRequestError } = require('../errors/bedRequest');
const { ForbiddenError } = require('../errors/forbidden');
const { InternalServerError } = require('../errors/internalServer');

const articleBadRequest = (req, res, next) => {
  req
    .then((articles) => {
      if (!articles) {
        throw new BadRequestError('Произошла ошибка');
      }

      res.status(201).send({ data: articles });
    })
    .catch(next);
};

const userServerErrorRequest = (req, res, next) => {
  req
    .then((user) => {
      if (!user) {
        throw new InternalServerError('Произошла ошибка сервера');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const postArticles = (req, res) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  articleBadRequest(
    Article.create({
      keyword, title, text, date, source, link, image, owner,
    }),
    res,
  );
};

const getArticles = (req, res) => {
  const owner = req.user._id;
  articleBadRequest(Article.find({ owner }), res);
};

const delArticles = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((user) => {
      if (!user) {
        throw new ForbiddenError('Такой карточки не существует.');
      } else if (req.user._id === user.owner.toString()) {
        userServerErrorRequest(Article.findByIdAndRemove(articleId), res);
      } else if (user.length <= 0) {
        throw new ForbiddenError('Статей нет, но все в твоих руках.');
      } else {
        throw new ForbiddenError('Это карта Вам не принадлежит.');
      }
    })
    .catch(next);
};

module.exports = { postArticles, getArticles, delArticles };
