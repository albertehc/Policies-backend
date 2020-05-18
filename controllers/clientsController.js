const DB = require("../models/DB");
const sendCookie = require("./../helpers/sendCookie");
const payload = require('./../helpers/payload');

exports.id = async (req, res) => {
  try {
    const { id } = req.params;
    const client = DB.getClientById(id);
    if (!client) return res.status(404).json({ msg: "Id not found" });
    sendCookie(res, payload(req.body.token), client);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.name = async (req, res) => {
  try {
    const client = DB.getClientByName(req.params.name);
    if (!client) return res.status(404).json({ msg: "Name not found" });
    sendCookie(res, payload(req.body.token), client);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};
