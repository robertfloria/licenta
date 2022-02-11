const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
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

app.post("/api/login", (req,res) => {

    const userName = req.body.username
    const userPassword = req.body.password
    const sqlSearch = "SELECT * FROM userregister WHERE username = ?"

    db.query(sqlSearch, [userName], (err, result) => {        
        if(err || result.length == 0)
        {                    
            console.log("---> User does not exist")
            res.sendStatus(404)
        }
        if(result.length > 0){
            const password = result[0].password
            if(password == userPassword){           
                console.log("---> Logged successfully")
            }else{               
                console.log("---> Password incorrect!")                        
            }
        }
    });
});

app.delete('/api/delete/:userName', (req, res) => {

    const userName = req.params.userName;
    const sqlDelete = "DELETE FROM userregister WHERE username = ?"
    db.query(sqlDelete, userName, (err, result) => {
        console.log(result);
    });
});

app.put('/api/update/password', (req, res) => {

    const userName = req.body.username;
    const userPassword = req.body.password;
    const sqlUpdate = "UPDATE userregister SET password = ? WHERE username = ?"
    db.query(sqlUpdate,[userPassword, userName], (err, result) => {
        console.log(result);
    });
});

app.put('/api/update/email', (req, res) => {

    const userName = req.body.username;
    const userEmail = req.body.email;
    const sqlUpdate = "UPDATE userregister SET email = ? WHERE username = ?"
    db.query(sqlUpdate,[userEmail, userName], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
