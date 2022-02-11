import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App2() {

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //const [movieReviewList, setMovieList] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  
  /*
  useEffect(() => {
    Axios.get("http://localhost:3001/api/select").then((response) => {
      setMovieList(response.data);
    });
  }, []);     // se pune [] deoarece useEffect se apeleaza la fiecare randare a paginii, iar noi nu vrem asta
    */

  const insertCredentials = () => {
    Axios.post("http://localhost:3001/api/insert/credentials", {
      username: userName, 
      password: userPassword,
      email: userEmail
    });

    /*setMovieList([              // update pe pagina fara a dat refresh
      ...movieReviewList, 
      {movieName: movieName, movieReview: review}
    ]);*/
  };

  const deleteUser = (userName) => {
    Axios.delete(`http://localhost:3001/api/delete/${userName}`)      //face delete request-ului
  };

  const updatePassword = (userName) => {
    Axios.put("http://localhost:3001/api/update/password", {
      username: userName,
      password: newUserPassword
    });
    setNewUserPassword("");
  };

  const updateEmail = (userName) => {
    Axios.put("http://localhost:3001/api/update/email", {
      username: userName,
      password: newUserEmail
    });
    setNewUserEmail("");
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

export default App2;










/* <div>
                <input type="text" name="newUserEmail" onChange={(e) => {
                    setNewUserEmail(e.target.value);
                }}>
                </input>
                <button onClick={updateEmail}>Update Email</button>               
                <input type="text" name="newUserEmail"></input>
                <button onClick={updatePassword}>Update Password</button>               
            </div>
            <button onClick={deleteUser}>Delete User</button> */



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