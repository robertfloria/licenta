import React from 'react';
import { useState } from "react";
import "./Modal.css";

const LoginModal = (props) => {
  
    return (
        <>
            <div className='modalLogin'>
                <div className='title'>
                    <h1>Login</h1>
                </div>
                <div className='body'>
                    <p>Move forword</p>
                </div>
                <div className='footer'>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button>Login</button>
                    <a href='#' onClick={()=>{
                        props.openRegister(true); props.openLogin(false);
                        }}>Go to Register</a>
                </div>       
            </div>  
        </>           
    )
}
export default LoginModal;