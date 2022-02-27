import React from 'react';
import { useState } from "react";
import "./Modal.css";
import LoginModal from './ModalLogin';
import RegisterModal from './ModalRegister';

export default function Modal ({closeModal}) {

    const [openLogin, setOpenLogin] = useState(true);
    const [openRegister, setOpenRegister] = useState(false);

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='closeButton'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                {openLogin ? <LoginModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal} /> : <RegisterModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal}/>}                 
            </div>
        </div>
    )
}
