const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//import createTokens from "./JWT.js";

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
app.use(cookieParser());

app.post("/api/insert/credentials", async (req,res) => {

    const userName = req.body.username;
    //const userPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userEmail = req.body.email;
    const sqlInsert = "INSERT INTO userregister (username, password, email) VALUES (?, ?, ?)"

    db.query(sqlInsert, [userName, hashedPassword, userEmail], (err, result) => {
        console.log(result);
    });
});

app.get("/api/select", (req,res) => {

    const sqlSelect = "SELECT * FROM userregister";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/login", async(req,res) => {

    const userName = req.body.username;
    const userPassword = req.body.password;
    const sqlSearch = "SELECT * FROM userregister WHERE username = ?";

    await db.query(sqlSearch, [userName], async(err, result) => {        
        if(err || result.length == 0)
        {                    
            console.log("---> User does not exist")
            res.sendStatus(404)         
        }
        if(result.length > 0){
            const hashedPassword = result[0].password;
            if(await bcrypt.compare(userPassword, hashedPassword)){
                console.log("---> Logged successfully")

                const accesToken = createTokens(result[0]);

                res.cookie("access-token", accesToken, {
                    maxAge: 2592000000 // 30 days in milliseconds [ms]; cookie will expire in 30 days
                });
                
            }       
            else {               
                console.log("---> Password incorrect!")
                res.sendStatus(404)                                   
            }
        }
    });
});

app.get("/profile", validateToken, (req, res) => {
    res.json("token validated")
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

function createTokens (user) {

    const accesToken = jwt.sign({username: user.username, id: user.id}, "secret");
    return accesToken;
};

function validateToken (req, res, next) {

    const accesToken = req.cookies["access-token"];

    if(!accesToken)
        return res.status(400).json({error: "User not authenticated!"});

    try{

        const validToken = jwt.verify(accesToken, "secret")

        if(validToken){

            req.authenticated = true;
            return next();
        }
    } catch(err) {
        return res.status(400).json({error: err});
    }
}