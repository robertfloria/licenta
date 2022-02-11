import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function Login() {

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const getLogin = () => {
    Axios.post("http://localhost:3001/api/login", {
      username: userName, 
      password: userPassword
    });
  };

  const deleteUser = () => {
    Axios.delete(`http://localhost:3001/api/delete/${userName}`)      //face delete request-ului
  };

  const updatePassword = () => {
    Axios.put("http://localhost:3001/api/update/password", {
      username: userName,
      password: newUserPassword
    });
    setNewUserPassword("");
  };

  const updateEmail = () => {
    Axios.put("http://localhost:3001/api/update/email", {
      username: userName,
      email: newUserEmail
    });
    setNewUserEmail("");
  };

  return (
    <div className="App">
        <h1>Login</h1>
        <div className="form">
            <label>Username</label>
            <input type="text" name="userName" onChange={(e) => {
            setUserName(e.target.value);
            }} 
            />

            <label>Password</label>
            <input type="password" name="userPassword" onChange={(e) => {
                setUserPassword(e.target.value);
            }} 
            />
            <button onClick={getLogin}>Login</button>         
            <h1>{userName}</h1>
            <h1>{userPassword}</h1>

            <div>
                <input type="text" name="newUserEmail" onChange={(e) => {
                    setNewUserEmail(e.target.value);
                  }}
                />
                <button onClick={updateEmail}>Update Email</button>   

                <input type="password" name="newUserPassword" onChange={(e) => {
                    setNewUserPassword(e.target.value);
                  }}
                />
                <button onClick={updatePassword}>Update Password</button>               
            </div>
            <button onClick={deleteUser}>Delete User</button>
        </div>
    </div>
  );
};

export default Login;


/* {movieReviewList.map((val) => {
      return (
          <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type = "text" id="updateInput" onChange={(e) => {
                  setNewReview(e.target.value);
              }}/>
              <button onClick={() => {updateReview(val.movieName)}}>Update</button>
          </div>
          );
      })
  } */