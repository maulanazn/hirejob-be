const jwt = require('jsonwebtoken');
require('dotenv').config()
// const secretKey = ;

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
    const decoded = jwt.verify(token, process.env.JWT_KEY);
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
