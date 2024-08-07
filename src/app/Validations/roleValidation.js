const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const roleValidation = async (req, response, next) => {
  try {
    const condition = Joi.object({
      name: Joi.string().min(4).max(10).required().trim().strict(),
    });
    await condition.validateAsync(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: error.message });
  }
};

module.exports = {
  roleValidation,
};
