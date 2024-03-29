const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  GenerateAccpectToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_PASS,
      {
        expiresIn: '15d',
      },
    );
  },
};
