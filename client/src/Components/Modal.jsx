import React from 'react';
import { useState, useEffect } from "react";
import { render } from 'react-dom';
import "../App.css"
import LoginModal from './ModalLogin';
import RegisterModal from './ModalRegister';
import App from '../DataVisualization/App.jsx';
import * as Icons2 from "react-icons/ri";

export default function Modal ({closeModal, loginStatus}) {

    const [openLogin, setOpenLogin] = useState(true);
    const [openRegister, setOpenRegister] = useState(false);
    //const [loginStatus, setLoginStatus] = useState(false);

    const OpenLoginRegisterModal = () => {
        if (openLogin == true && openRegister == false)
        {
            return <LoginModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal} loginStatus = {loginStatus}/>;
        }
        else 
            if(openRegister == true  && openLogin == false)
            {
                return <RegisterModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal}/>;
            }               
    }

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='closeButton'>
                    <button onClick={() => closeModal(false)}>x</button>
                </div>
            <OpenLoginRegisterModal/>        
            
             {/*{openLogin ? <LoginModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal} /> : <RegisterModal openRegister = {setOpenRegister} openLogin = {setOpenLogin} closeModal = {closeModal}/>}   */}   
            </div>
        </div>
    )
}
