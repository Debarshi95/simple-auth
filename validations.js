const Joi = require("Joi");

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(6).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message.trim());
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message.trim());
  }
  next();
};

const validatePosts = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message.trim());
  }
  next();
};
module.exports = { validateRegister, validateLogin, validatePosts };
