import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

const authAdmin = (req, res, next) => {
  // if (typeof req.headers.authorization !== 'string') {
  //   return res.status(400).json({
  //    'error': 'unknown error',
  //   });
  // }
  const token = req.header('authorization');
  if (!token) {
    return res.status(403).json({
      'message': 'Access Denied: No Token Provided!',
    });
  } else {
    try {
    const decodedUser = jwt.verify(token, process.env.secret_token, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
      }
      if(req.decoded.admin === true) {
        next();
      } else {
        res.status(401).json({
          'error': 'Unauthorized access',
        })
      }
    });
    }
    catch (e) {
      return res.status(403).json({
        'message': 'Invalid Token!!',
      });
    }
  }
  return res.end();
};

export default authAdmin;
