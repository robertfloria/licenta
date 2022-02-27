import React from 'react';
import { useState } from "react";
import "./Modal.css";
import Axios from "axios";

const RegisterModal = (props) => {
  
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
        <>               
            <div className='modalRegister'>
                <div className='title'>
                    <h1>Register</h1>
                </div>
                <div className='form'>
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
                </div>
                <div className='footer'>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button onClick={insertCredentials}>Submit</button>
                    <a href='#' onClick={()=>{
                        props.openRegister(false); props.openLogin(true);
                        }}>Go to Login</a>
                </div>       
            </div>  
        </>
    )
}
export default RegisterModal;
