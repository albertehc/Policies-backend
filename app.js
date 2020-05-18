const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const DB = require('./models/DB');
const Policies = require('./models/DB');

const app = express();
const port = process.env.PORT || 4000;

DB.getData();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: '*' }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/signup", require("./routes/signup"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/policies", require("./routes/policies"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Running on port ${port}`);
});
