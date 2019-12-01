const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { celebrate, Joi, errors } = require("celebrate");

const { postUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const error = require("./middlewares/error");
const user = require("./routes/users");
const article = require("./routes/articles");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://localhost:27017/newsdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),

      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
    })
  }),
  postUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(5)
    })
  }),
  login
);

app.use(auth);

app.use("/", user);
app.use("/articles", article);
app.use("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);

app.use(errors());
// celebrate

app.use(error);

app.listen(PORT);
