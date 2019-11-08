const authAdmin = (req, res, next) => {
  const token = req.header('x-auth-header');
  if (!token) {
    return res.status(403).json({
      'message': 'Access Denied: No Token Provided!',
    });
  }
  const checkAuth = ()  => {
    try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    if(role[decoded.role].find((url) => {
      return url === req.baseUrl
    })) {
      req.user = decoded
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
  return token;
};

export default authAdmin;
