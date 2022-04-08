import React from 'react';
import { useState, useEffect } from "react";
import { render } from 'react-dom';
import "./Modal.css";
import LoginModal from './ModalLogin';
import RegisterModal from './ModalRegister';

export default function Modal ({closeModal}) {

    const [openLogin, setOpenLogin] = useState(true);
    const [openRegister, setOpenRegister] = useState(false);

    const OpenLoginRegisterModal = () => {
        if (openLogin == true && openRegister == false)
        {
            console.log("nnu repa");
            return <LoginModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal} />;
        }
        else 
            if(openRegister == true  && openLogin == false)
            {
                return <RegisterModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal}/>;
            }
        else return "ok";
        
    }

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='closeButton'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
            <OpenLoginRegisterModal/>
            
             {/*{openLogin ? <LoginModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal} /> : <RegisterModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal}/>}   */}   
            </div>
        </div>
    )
}
