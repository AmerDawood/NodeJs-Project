const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required().min(3).max(10),
  password: Joi.string().regex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    // .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    .message(
      "Password must be >= 8 digits and contains lower, upper and number digits"
    )
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().regex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    // .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    .message(
      "Password must be >= 8 digits and contains lower, upper and number digits"
    )
    .required(),
});

module.exports = {
  userValidator: schema,
  loginValidator: loginSchema,
};
