import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';

const LoginModal = (props) => {
  
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");

    const [loginRes, setLoginRes] = useState("");
    const [loginErr, setLoginErr] = useState("");

    
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
        if(!response.data.message){
          setLoginRes(response.data.message);
          console.log("---" + response.data.message);
        } else {
          console.log(response.data);
          setLoginRes(response.data[0].userName);
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
                    <button onClick={() => {
                      getLogin();
                                            
                      }}>Login</button>
                    
                    <p>Need an Account?</p>
                    <a href='#' onClick={() => {
                        props.openRegister(true); props.openLogin(false);
                        }}>Sign Up
                    </a> 
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