const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendCookie = require("./../helpers/sendCookie");
const Clients = require("./../models/Clients");

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const user = Clients.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ msg: "Email not valid" });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ msg: "Password not valid" });
    const payload = {
      id: user.id,
      name: user.name,
      email,
      role: user.role,
    };

    sendCookie(res, payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.me = async (req, res) => {
  const { email } = req.body.token;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }

  try {
    const user = await Clients.getUserByEmail(email);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    sendCookie(res, payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  const { name, email, password, role } = req.body;
  let { oldPassword } = req.body;
  const { id } = req.body.token;
  console.log(id)
  try {
    if (email !== req.body.token.email) {
      const checkEmail = await Clients.getUserByEmail(email);
      if (checkEmail) return res.status(401).json({ msg: "Email already in use" });
    }
    const userData = Clients.getUserById(id);
    console.log(userData,id);
    const checkPassword = await bcryptjs.compare(
      oldPassword,
      userData.password
    );
    if (!checkPassword)
      return res.status(401).json({ msg: "Password incorrect" });
    let hashPassword = userData.password;
    if (password !== oldPassword) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    Clients.edit({
      id,
      name,
      email,
      password: hashPassword,
    }, id);
    const payload = { id, name, email, role };
    sendCookie(res, payload);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body.token;
  const { password } = req.body;
  try {
    const userData = await Clients.getUserById(id);
    if (!password) return res.status(400).json({ msg: "Password empty" });
    const checkPassword = await bcryptjs.compare(password,
      userData.password);
    if (!checkPassword)
      return res.status(401).json({ msg: "Password incorrect" });
    Clients.remove(id);
    res.clearCookie(process.env.WEBSITENAME || "Test");
    res.status(200).json({ msg: "Client deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie(process.env.WEBSITENAME || "Test");
    res.status(200).json({ msg: "Log out sucesfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};
