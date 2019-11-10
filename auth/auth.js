import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

const authAdmin = (req, res, next) => {
  const token = req.header('x-auth-header');
  if (!token) {
    return res.status(403).json({
      'message': 'Access Denied: No Token Provided!',
    });
  } else {
    try {
    const decoded = jwt.verify(token, config.secret);
    if(role[decoded.role].find((url) => {
      return url === req.baseUrl
    })) {
      return req.user = decoded
    }

    if (req.user.admin === true) {
      return next();
    } else {
      return res.status(403).json({
        'message': 'Access Denied. Unauthorized page',
      });
    }
    }
    catch (e) {
      return res.status(403).json({
        'message': 'Invalid Token',
      });
    }
  }
  return res.end();
};

export default authAdmin;
