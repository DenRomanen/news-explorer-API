const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },

  title: { type: String, require: true, minlength: 2 },

  text: { type: String, require: true },

  date: { type: Date, require: true },

  source: { type: String, require: true },

  link: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: props => `${props.value} Эта строка должна быть ссылкой!`
    },
    required: true
  },

  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: props => `${props.value} Эта строка должна быть ссылкой!`
    },
    required: true
  },

  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("article", articleSchema);
