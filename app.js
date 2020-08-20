const express = require("express");
const logger = require("morgan")("dev");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const app = express();
const { connection } = require("./mysql.js");

const cors = require("cors");

app.set("port", process.env.PORT || 8081);
app.use(cors());
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

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM sql12361367.USER", function (
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
    results
  ) {
    if (error) {
      res.status(500).json(error);
    } else {
      connection.query("SELECT * FROM sql12361367.SCHEDULE", function (
        error,
        schedule_results
      ) {
        if (!error) {
          res
            .status(200)
            .json({ interviews: results, schedule: schedule_results });
        } else {
          res.status(500).json(error);
        }
      });
    }
  });
});

// Creates new interview record with all the validation
app.post("/interview", (req, res) => {
  connection.query(
    `SELECT candidate_id FROM 
        (SELECT candidate_id,schedule_id,start_time,end_time 
            FROM sql12361367.SCHEDULE 
            INNER JOIN sql12361367.INTERVIEW ON sql12361367.INTERVIEW.interview_id=sql12361367.SCHEDULE.interview_id) AS T
        WHERE (T.start_time>${req.body.start_time} AND T.start_time<${req.body.end_time}) 
            OR (T.end_time>${req.body.start_time} AND T.end_time<${req.body.end_time}) ;`,

    function (error, results) {
      if (error) {
        res.status(500).json(error);
      }
      if (results.length == 0) {
        connection.query(
          `SELECT * FROM sql12361367.INTERVIEW
            WHERE (T.start_time>${req.body.start_time} AND T.start_time<${req.body.end_time}) 
            OR (T.end_time>${req.body.start_time} AND T.end_time<${req.body.end_time}) ;`,

          function (error, results) {
            if (!error) {
              if (results.length == 0) {
                connection.query(
                  `INSERT INTO sql12361367.INTERVIEW (start_time, end_time, user_id) 
                    values(${req.body.start_time},${req.body.end_time},${req.body.user_id});`,
                  function (error, results) {
                    if (error) {
                      res.status(500).json(error);
                    } else {
                      var interview_id = 1;
                      var sql =
                        "INSERT INTO SCHEDULE (candidate_id, interview_id) VALUES ?";
                      var values = req.body.candidates.map((candidate) => {
                        return [candidate.candidate_id, req.body.user_id];
                      });

                      conn.query(sql, [values], function (err) {
                        if (err) throw err;
                        conn.end();
                      });
                      res.status(200).json(results);
                    }
                  }
                );
              }
            } else {
            }
          }
        );
      } else {
        res.status(400).json(result);
      }
    }
  );
});

// Updates interview time
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

// Deletes Interview
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
