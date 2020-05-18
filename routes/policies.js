const express = require("express");
const router = express.Router();
const policiesController = require("./../controllers/policiesController");
const admin = require("./../middleware/admin");
const auth = require("./../middleware/auth");

router.get("/name/:name", auth, admin, policiesController.name);

router.get("/policy/:id", auth, admin, policiesController.policy);

module.exports = router;
