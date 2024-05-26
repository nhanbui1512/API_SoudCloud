const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const registerValidation = async (req, response, next) => {
  const correctCondition = Joi.object({
    userName: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().required().min(3).max(50).trim().strict(),
    password: Joi.string().required(),
  });

  await correctCondition.validateAsync(req.body, { abortEarly: false });
  next();
  try {
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

const updateValidation = async (req, response, next) => {
  const condition = Joi.object({
    userName: Joi.string().min(3).max(50).trim().strict(),
    city: Joi.string().min(3).max(50).trim().strict(),
    country: Joi.string().min(3).max(50).trim().strict(),
    bio: Joi.string().min(3).trim().strict(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ erros: error.message });
  }
};

module.exports = {
  registerValidation,
  updateValidation,
};