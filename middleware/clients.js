module.exports = (req, res, next) => {
  try {
    const { role } = req.body.token;
    if (role === "admin" || role === "user") {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "No valid Token" });
  }
};
