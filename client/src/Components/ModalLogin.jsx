import React from 'react';
import { useState } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';

const LoginModal = (props) => {
  
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");

    const [loginRes, setLoginRes] = useState("");
    const [loginErr, setLoginErr] = useState("");

    const getLogin = () => {
        Axios.post("http://localhost:3001/api/login", {
          username: userName, 
          password: userPassword
        }).then((res) => {
            setLoginRes(res.status);
          }).catch((err) => {
              setLoginErr(err);
            })
    };
    
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
                    </div>
                </div>

                <div className='footer'>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button onClick={() => {
                        getLogin(); console.log(loginRes);
                        if(loginRes === 200 && loginErr == "")
                          {
                            console.log("mota");
                            alert("Logged!");
                            setLoginErr("");
                            setLoginRes("");
                            props.openRegister(false); props.openLogin(false);
                            return (
                            <div><App /></div>);
                            
                          }
                        else
                          {
                            console.log("nu")
                            alert("try again, bitch!")
                            setLoginErr("");
                            setLoginRes("");
                            
                          }
                      }
                    }>Login</button>
                    <a href='#' onClick={()=>{
                        props.openRegister(true); props.openLogin(false);
                        }}>Go to Register</a>
                </div>       
            </div>  
        </>           
    )
}
export default LoginModal;
