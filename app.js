const express = require("express");
const logger = require("morgan")("dev");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(app.get("port"), () => {
  console.log("Listeneing at port 8080");
});
