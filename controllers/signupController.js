const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const sendCookie = require("./../helpers/sendCookie");
const DB = require("../models/DB");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  const { email, password, name, role } = req.body;

  try {
    if (DB.getClientByEmail(email)) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    const id = uuidv4();
    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(password, salt);
    DB.signupClient({ ...req.body, id });
    const payload = { id, name, email, role };
    sendCookie(res, payload);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error ocurred");
  }
};
