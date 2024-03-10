const Joi = require("joi");

module.exports.addressSchema = Joi.object({
  address: Joi.object({
    street: Joi.string()
      .regex(/^[a-zA-Z0-9\s.,\-\()]{1,100}$/)
      .required(),
    city: Joi.string()
      .regex(/^[a-zA-Z\s\-.]{1,100}$/)
      .required(),
    state: Joi.string()
      .regex(/^[a-zA-Z\s\-.]{1,100}$/)
      .required(),
    country: Joi.string()
      .regex(/^[a-zA-Z\s\-.]{1,100}$/)
      .required(),
    zipCode: Joi.string()
      .regex(/^\d{5,10}$/)
      .required(),
  }).required(),
});

module.exports.userSignupSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z0-9_]{4,20}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .required(),
});
