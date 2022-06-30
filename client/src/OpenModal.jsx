import Modal from "./Components/Modal";
import "./App.css";
import { useState, useEffect } from "react";
import App from './DataVisualization/App.jsx';
import MainMenu from "./Components/MainMenu.jsx";
import * as Icons2 from "react-icons/ri";

export default function OpenModal() {

    const [openModal, setOpenModal] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    return (
        <>
            <div className="openModal">
                <h1 className="headingOpenModal">Welcome to our app!</h1>
                <button 
                    className="openModalBtn" 
                    onClick={() => {
                        setOpenModal(true)
                    }}
                >
                    Log in
                </button>           
                <Icons2.RiReactjsFill className='logo-openModal-app'/>
                {openModal && <Modal closeModal={setOpenModal} loginStatus = {setLoginStatus}/>}
            </div>
        </>
    )
}
