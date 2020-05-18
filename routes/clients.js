const express = require("express");
const router = express.Router();
const clientsController = require("./../controllers/clientsController");
const clients = require("./../middleware/clients");
const auth = require("./../middleware/auth");

router.get("/id/:id", auth, clients, clientsController.id);

router.get("/name/:name", auth, clients, clientsController.name);

module.exports = router;
