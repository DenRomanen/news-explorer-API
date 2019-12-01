const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  postArticles,
  getArticles,
  delArticles
} = require("../controllers/articles");

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string()
        .required()
        .min(2)
        .max(20),
      title: Joi.string()
        .required()
        .min(2),
      text: Joi.string().required(),
      date: Joi.date().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .required()
        .regex(
          /^(http:\/\/|https:\/\/)(((\d{1,3}\.){3}\d{1,3}([:]\d{2,5})?)\/?|(w{3}\.)?\w+(\.\w+)?([^www]\.[a-zA-Z]{2,5})(\/\w+)*(#)?\/?)/
        ),
      image: Joi.string()
        .required()
        .regex(
          /^(http:\/\/|https:\/\/)(((\d{1,3}\.){3}\d{1,3}([:]\d{2,5})?)\/?|(w{3}\.)?\w+(\.\w+)?([^www]\.[a-zA-Z]{2,5})(\/\w+)*(#)?\/?)/
        )
    })
  }),
  postArticles
);
router.get("/", getArticles);
router.delete(
  "/:articleId",
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().length(24)
    })
  }),
  delArticles
);

module.exports = router;
