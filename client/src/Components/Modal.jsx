import React from 'react';
import { useState } from "react";
import "./Modal.css";

export default function Modal ({closeModal}) {

    const [openLogin, setOpenLogin] = useState(true);
    const [openRegister, setOpenRegister] = useState(false);

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='closeButton'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className='modalLogin'>
                    <div className='title'>
                        <h1>Continue if you have courage!</h1>
                    </div>
                    <div className='body'>
                        <p>Move forword</p>
                    </div>
                    <div className='footer'>
                        <button onClick={() => closeModal(false)} id='cancelButton'>Cancel</button>
                        <button>Login</button>
                        <a href='#'>Go to login</a>
                    </div>
                </div>             
            </div>
        </div>
    )
}