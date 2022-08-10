const Joi = require("joi");

const registerValidation = (object) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().trim().max(50).required(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(object);
};

const loginValidation = (object) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().max(50).required(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(object);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
