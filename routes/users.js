const router = require("express").Router();
// const { celebrate, Joi } = require("celebrate");

const { getMe } = require("../controllers/users");

router.get("/users/me", getMe);

module.exports = router;
