const DB = require("../models/DB");
const sendCookie = require("./../helpers/sendCookie");

exports.name = async (req, res) => {
  try {
    const { name } = req.params;
    const payload = {
      id: req.body.token.id,
      name: req.body.token.name,
      email: req.body.token.email,
      role: req.body.token.role,
    };
    const client = DB.getClientById(id);
    if (!client) return res.status(404).json({ msg: "Id not found" });
    sendCookie(res, payload, client);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.policy = async (req, res) => {
  try {
    const payload = {
      id: req.body.token.id,
      name: req.body.token.name,
      email: req.body.token.email,
      role: req.body.token.role,
    };
    const client = DB.getClientByName(req.params.name);
    if (!client) return res.status(404).json({ msg: "Name not found" });
    sendCookie(res, payload, client);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};
