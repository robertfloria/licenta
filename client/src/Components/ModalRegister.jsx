import React from 'react';
import { useState } from "react";
import "./Modal.css";

const RegisterModal = (props) => {
  
    return (
        <>               
            <div className='modalRegister'>
                <div className='title'>
                    <h1>Register</h1>
                </div>
                <div className='body'>
                    <p>Move forword</p>
                </div>
                <div className='footer'>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button>Register</button>
                    <a href='#' onClick={()=>{
                        props.openRegister(false); props.openLogin(true);
                        }}>Go to Login</a>
                </div>       
            </div>  
        </>           
    )
}
export default RegisterModal;
