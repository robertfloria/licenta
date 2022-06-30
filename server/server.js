const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session"); // it helps to mantain the session; works with cookies
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

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true       // allow the cookie to be enable
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 24*60*60 //expires in 24 hours, converted in seconds[s]
    }
}))

app.post("/api/insert/credentials", async (req,res) => {

    const userName = req.body.username;
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
            res.json({authorised: false, message: "User does not exist!"});        
        }
        if(result.length > 0){
            const hashedPassword = result[0].password;
            if(await bcrypt.compare(userPassword, hashedPassword)){
                
                console.log("---> Logged successfully")

                const accessToken = createTokens(result[0]);
                const refreshToken = createRefreshTokens(result[0]);

                refreshTokens.push(refreshToken);

                req.session.user = result;
                
                res.json({authorised: true, token: accessToken, refreshToken: refreshToken});
                //res.send(result);
            }       
            else {               
                console.log("---> Password incorrect!")
                res.json({authorised: false, message: "Password incorrect!"});                                   
            }
        }
    });
});

app.post("/api/logout", validateToken, (req, res) => {

    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully!");
});

app.get("/api/userAuthStatus", validateToken,(req, res)=>{
    res.send("You are authenticated!")
});

let refreshTokens = [];

app.post("/api/refreshToken", (req, res) => {
    //take the refresh token from the user

    const refreshToken = req.body.token;

    // if everything ok, create new access token, refresh token and send to user

    jwt.verify(refreshToken, "MyRefreshSecretKey", (err, user) => {

        err && console.log(err);

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = createTokens(user);
        const newRefreshToken = createRefreshTokens(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            token: newAccessToken,
            refreshToken: newRefreshToken
        });
    });

    // send error if there is no token or it's invalid

    if(!refreshToken)
        return res.status(401).json("Your token is invalid or doesn't exist");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid!")
    }
})

app.get("/api/login", (req, res)=>{
    if(req.session.user){
        res.send({loggdedIn: true, user: req.session.user});
    } else {
        res.send({loggdedIn: false});
    }
});

app.get("/profile", validateToken, (req, res) => {
    res.json("token validated")
});

app.delete('/api/delete/:userId', validateToken, (req, res) => {

    const userId = req.params.userId;
    const sqlDelete = "DELETE FROM userregister WHERE id = ?"

    if(req.user.id == userId /*|| req.user.isAdmin*/){
        
        db.query(sqlDelete, userId, (err, result) => {
            console.log(result);
        });

        res.status(200).json("User have been deleted!")
    } else {
        res.status(403).json({id: req.user.id, message:"User id request doesn't match"})
    }
});

app.put('/api/update/password/:username', validateToken, async (req, res) => {

    const userName = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sqlUpdate = "UPDATE userregister SET password = ? WHERE username = ?"

    if(req.user.username == req.params.username /*|| req.user.isAdmin*/) {

        db.query(sqlUpdate,[hashedPassword, userName], (err, result) => {
            console.log(result);
        });

        res.status(200).json("User password have been updated!")
    } else {
        res.status(403).json({id: req.user.id, message:"You have not permission to make changes!"})
    }
});

app.put('/api/update/email/:username', validateToken, (req, res) => {

    const userName = req.body.username;
    const userEmail = req.body.email;
    const sqlUpdate = "UPDATE userregister SET email = ? WHERE username = ?"
    
    if(req.user.username == req.params.username /*|| req.user.isAdmin*/){
        
        db.query(sqlUpdate,[userEmail, userName], (err, result) => {
            console.log(result);
        });

        res.status(200).json("User email have been updated!")
    } else {
        res.status(403).json({id: req.user.id, message:"You have not permission to make changes!"})
    }
});

app.post("/api/select/userData/:username", validateToken, (req, res) => {

    const userName = req.body.username;
    const sqlSelect = "SELECT id, username, email FROM userregister WHERE username = ?"

    if(req.user.username == req.params.username /*|| req.user.isAdmin*/) {
        db.query(sqlSelect, [userName], (err, result) => {
            res.send(result[0]);
        });

    } else {
        res.status(403).json({id: req.user.id, message:"You have not permission to make changes!"})
    }
});

app.listen(3001, () => {
    console.log("running on port 3001")
});

function createTokens (user) {

    const accessToken = jwt.sign({username: user.username, id: user.id}, "MySecretKey", {
        expiresIn: 300
    });
    return accessToken;
};

function createRefreshTokens (user) {

    const accessToken = jwt.sign({username: user.username, id: user.id}, "MyRefreshSecretKey");
    return accessToken;
};

function validateToken (req, res, next) {

    const accessToken = req.headers["authorization"];

    if(!accessToken){
        return res.status(400).json({error: "You need a Token for authentication!"});
    } else {

        jwt.verify(accessToken, "MySecretKey", (err, user) => {
            if(err){
                return res.status(403).json({authorisation: false, message: err})
            } else {
                req.user = user;
                next();
            }
        });
    }
};

const fs = require('fs'); // file-system module

function WriteFile (file) {

    fs.writeFile("D:/GitHub/licenta/client/src/DataVisualization/data/ImportedData.json", file, 'utf8',  (err) => {
        if (err)
            return console.log(err);
        
        console.log("file saved!")
     });
}

app.post("/api/uploadFile", async(req, res)=> {
    
    const jsonFile = req.body;
    WriteFile(JSON.stringify(jsonFile));
    res.status(200);
});

