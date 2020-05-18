const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.cookies[process.env.WEBSITENAME || 'Test']) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  if (!req.body.password) req.body.password = req.body.oldPassword;
  const token = req.cookies[process.env.WEBSITENAME || 'Test'];
  try {
    const signature = jwt.verify(token, process.env.SECRETKEY || 'SOMESUPERSECRETKEY');
    req.body.token = signature;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "No valid Token" });
  }
};
