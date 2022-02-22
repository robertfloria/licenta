import React from 'react';
import "./Modal.css";
export default function Modal ({closeModal}) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='closeButton'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className='title'>
                    <h1>Continue if you have courage!</h1>
                </div>
                <div className='body'>
                    <p>Move forword</p>
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} id='cancelButton'>Cancel</button>
                    <button>Continue</button>
                </div>             
            </div>
        </div>
    )
}