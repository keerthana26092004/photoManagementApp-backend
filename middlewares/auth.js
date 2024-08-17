const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Token required');

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

module.exports = authenticate;
