import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';
import axios from 'axios';

const LoginModal = (props) => {
  
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");

    const [loginRes, setLoginRes] = useState("");
    const [loginErr, setLoginErr] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;
    
  /*
    const getLogin = () => {
        Axios.post("http://localhost:3001/api/login", {
          username: userName, 
          password: userPassword
        }).then((res) => {
            setLoginRes(res.status);
            //props.loginStatus(true);
          }).catch((err) => {
              setLoginErr(err);
            })
    };*/

    const getLogin = () => {
      Axios.post("http://localhost:3001/api/login", {
        username: userName, 
        password: userPassword
      }).then((response) => {
        if(response.data.authorised == false){
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", response.data.token);
          setLoginStatus(true);
        }       
    })};
    
    const deleteUser = (userName) => {
      Axios.delete(`http://localhost:3001/api/delete/${userName}`)
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
/*
    useEffect(()=>{
      
      if(loginRes === 200 && loginErr === "")
      { 
        props.closeModal(false);
        alert("Logged!");  
        props.loginStatus(true);  
      }
      else
        if(loginRes !== 200 && loginErr !== "")
          {
            alert("try again, bitch!")             
          }

      return()=>{  // useEffect cleanup; after every render return this
        setLoginErr("");
        setLoginRes("");   
        //props.loginStatus(false);
      };
                                 
    },[loginRes, loginErr, props]);
*/

const [user, setUser] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const res = await Axios.post("http://localhost:3001/api/login", {
        username: userName, 
        password: userPassword
      });

      setUser(res.data);
  }
  catch (err){
    console.log(err);
  }
};

const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);

const handleDelete = async (id) => {
  setSuccess(false);
  setError(false);
  try{
    await Axios.delete("http://localhost:3001/api/delete/"+id, {    

      headers:{
        "access-token" : localStorage.getItem("token")
      }
    });
    setSuccess(true);
  }
  catch (err){
    console.log(err);
    setError(true);
  }
}

const userAuthenticated = () => {
  Axios.get("http://localhost:3001/api/userAuthStatus", {
    headers:{
      "access-token" : localStorage.getItem("token")
    }}).then((response)=>{
      console.log(response);

    })
}

useEffect(()=> {
  Axios.get("http://localhost:3001/api/login").then((response)=>{
    if(response.data.loggedIn == true)
      setLoginRes(response.data[0].username);

  })
},[]);
    
    return (
        <>
            <div className='modalLogin'>
                <div className='title'>
                    <h1>Login</h1>
                </div>
                <div className='form'>
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
                    <a href='#'>Forgot Password?</a>                 
                </div> 

                <div className='footer'>
                    <hr id="line"></hr>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button onClick={getLogin}>Login</button>
                    
                    <p>Need an Account?</p>
                    <a href='#' onClick={() => {
                        props.openRegister(true); props.openLogin(false);
                        }}>Sign Up
                    </a>

                    {loginStatus && (
                      
                      //<button onClick={userAuthenticated}> check if auth</button>
                      <button onClick={()=>handleDelete(22)}> delete</button>
                      
                    )} 

                </div>                       
            </div>
        </>           
    )
}
export default LoginModal;

/*}
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
        <button onClick={() => {deleteUser(userName)}}>Delete User</button>        
    </div>*/