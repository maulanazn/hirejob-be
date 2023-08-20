const jwt = require('jsonwebtoken');
const secretKey = 'secretKey123';

const VertifikasiToken = async (req, res, next) => {
  const generateToken = req.header('Authorization');
  if (!generateToken) {
    return res.status(401).json({
      success: false,
      message: 'Input Token First',
    });
  }

  const token = generateToken.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    console.log('=======================================');
    const decoded = jwt.verify(token, secretKey);
    req.payload = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

module.exports = {
  VertifikasiToken,
};
