import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function Register() {

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const insertCredentials = () => {
    Axios.post("http://localhost:3001/api/insert/credentials", {
      username: userName, 
      password: userPassword,
      email: userEmail
    });
  };

  return (
    <div className="App">
        <h1>Register</h1>
        <div className="form">

            <label>Username</label>
            <input type="text" name="userName" onChange={(e) => {
            setUserName(e.target.value);
            }} 
            />

            <label>Password</label>
            <input type="text" name="userPassword" onChange={(e) => {
            setUserPassword(e.target.value);
            }} 
            />

            <label>Email</label>
            <input type="text" name="userEmail" onChange={(e) => {
            setUserEmail(e.target.value);
            }} 
            />

            <button onClick={insertCredentials}>Submit</button>         
        </div>
    </div>
  );
};

export default Register;
