module.exports = (req, res, next) => {
  try {
    if (req.body.token.role === "admin") {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "No valid Token" });
  }
};
