const express = require("express");
const logger = require("morgan")("dev");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const app = express();
const { connection } = require("./mysql.js");

app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  connection.query("SELECT 1", function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results[0]["1"]);
  });
});

app.listen(app.get("port"), () => {
  console.log("Listeneing at port 8081");
});
