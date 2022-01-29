const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "3SQ.3.Flr.2!s&",
    database: "cruddatabase",
    port: "3306"  
});

db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post("/api/insert", (req,res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.get("/api/select", (req,res) => {

    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?"
    db.query(sqlDelete, name, (err, result) => {
        console.log(result);
    });
});

app.put('api/update', (req, res) => {
    const name = req.params.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"
    db.query(sqlUpdate,[name, movieReview], (err, result) => {
        console.log(result);
    })
   
});

app.listen(3001, () => {
    console.log("running on port 3001")
});


