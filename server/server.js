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
    database: "d3project",
    port: "3306"  
});

db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post("/api/insert/credentials", (req,res) => {

    const userName = req.body.username
    const userPassword = req.body.password
    const userEmail = req.body.email
    const sqlInsert = "INSERT INTO userregister (username, password, email) VALUES (?, ?, ?)"

    db.query(sqlInsert, [userName, userPassword, userEmail], (err, result) => {
        console.log(result);
    });
});

app.get("/api/select", (req,res) => {

    const sqlSelect = "SELECT * FROM userregister";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/login", (req,res) => {

    const userName = req.body.username
    const userPassword = req.body.password
    
    db.getConnection (async (err, connection) => {

        if(err) throw(err)
            const sqlSearch = "SELECT * FROM userregister WHERE username = ?"
            const searchQuery = mysql.format(sqlSearch, [userName])

        await connection.query(searchQuery, async(err, result) => {

            connection.release();
            if(err) throw(err)
                if(result.length == 0){                    
                    console.log("---> User does not exist")
                    res.sendStatus(404)
                }
            else{
                const password = result[0].password
                if(await compare(password, userPassword)){
                    //alert('user logged successfuly')
                    console.log("---> Login successful")
                }
                else{
                    //alert("Incorrect password!")
                    console.log("---> Password incorrect!")                        
                }
            }
        });
    });
});

app.get("/api/loginN", (req,res) => {

    const userName = req.body.username
    const userPassword = req.body.password
    
    const sqlSearch = "SELECT * FROM userregister WHERE username = ?"
        //const searchQuery = mysql.format(sqlSearch, [userName])
        db.query(sqlSearch, [userName], (err, result) => {

            if(err) throw(err)
                if(result.length == 0){                
                    console.log(res)    
                    console.log("---> User does not exist")
                    res.sendStatus(404)
                }
            else{
                const password = result[0].password
                if(password == userPassword){
                    //alert('user logged successfuly')
                    console.log("---> Login successful")
                }
                else{
                    //alert("Incorrect password!")
                    console.log("---> Password incorrect!")                        
                }
            }
        });
    
});

app.delete('/api/delete/:username', (req, res) => {

    const userName = req.params.username;
    const sqlDelete = "DELETE FROM userregister WHERE username = ?"
    db.query(sqlDelete, userName, (err, result) => {
        console.log(result);
    });
});

app.put('/api/update/password', (req, res) => {

    const userName = req.body.username;
    const userPassword = req.body.password;
    const sqlUpdate = "UPDATE userregister SET password = ? WHERE username = ?"
    db.query(sqlUpdate,[userName, userPassword], (err, result) => {
        console.log(result);
    });
});

app.put('/api/update/email', (req, res) => {

    const userName = req.body.username;
    const userEmail = req.body.email;
    const sqlUpdate = "UPDATE userregister SET email = ? WHERE username = ?"
    db.query(sqlUpdate,[userName, userEmail], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});













/*const express = require ("express");
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

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"
    db.query(sqlUpdate,[movieReview, name], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
*/

