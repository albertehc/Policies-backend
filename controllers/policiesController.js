const DB = require("../models/DB");
const sendCookie = require("./../helpers/sendCookie");
const payload = require("./../helpers/payload");

exports.name = async (req, res) => {
  try {
    const { name } = req.params;
    const client = await DB.getClientByName(name);

    if (!client)
      return res.status(404).json({ msg: "No client with that name" });

    const { id } = client;
    const policies = DB.getPoliciesByClientId(id);

    if (!policies.length)
      return res.status(404).json({ msg: "No policies found" });

    sendCookie(res, payload(req.body.token), policies);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.policy = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = DB.getPoliciesById(id);
    if (!policy) return res.status(404).json({ msg: "Policy not found" });
    const client = DB.getClientById(policy.clientId);
    if (!client) return res.status(404).json({ msg: "No client found" });
    sendCookie(res, payload(req.body.token), client);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};
