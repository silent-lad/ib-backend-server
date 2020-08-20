const express = require("express");
const logger = require("morgan")("dev");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
