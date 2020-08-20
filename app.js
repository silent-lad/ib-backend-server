const express = require("express");
const logger = require("morgan")("dev");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const app = express();
const { connection } = require("./mysql.js");

app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(logger);

app.get("/candidates", (req, res) => {
  connection.query("SELECT * FROM sql12361367.CANDIDATE", function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/interview", (req, res) => {
  connection.query("SELECT * FROM sql12361367.INTERVIEW", function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results[0]["1"]);
    }
  });
});

app.post("/interview", (req, res) => {
  connection.query(
    `INSERT INTO sql12361367.INTERVIEW (start_time, end_time, user_id) 
    values(${req.body.start_time},${req.body.end_time},${req.body.user_id});`,
    function (error, results, fields) {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results[0]["1"]);
      }
    }
  );
});

app.patch("/interview/:id", (req, res) => {
  connection.query(
    `UPDATE sql12361367.INTERVIEW
        SET start_time = ${req.body.start_time}, end_time = ${req.body.end_time},
        WHERE interview_id=" + ${req.params.id};`,
    function (error, results, fields) {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.delete("/interview/:id", (req, res) => {
  connection.query(
    "DELETE FROM sql12361367.INTERVIEW WHERE interview_id=" + req.params.id,
    function (error, results, fields) {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.listen(app.get("port"), () => {
  console.log("Listeneing at port 8081");
});
