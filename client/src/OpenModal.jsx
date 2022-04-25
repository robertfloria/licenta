import Modal from "./Components/Modal";
import "./App.css";
import { useState, useEffect } from "react";
import App from './DataVisualization/App.jsx';
import MainMenu from "./Components/MainMenu.jsx";
import { BrowserRouter as Router, Switch, Route, Navigate} from "react-router-dom";

export default function OpenModal() {

    const [openModal, setOpenModal] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [openCharts, setOpenCharts] = useState(false);
    const OpenPages = () => {
        if(openModal == true && loginStatus == false)
            {return <Modal closeModal={setOpenModal} loginStatus = {setLoginStatus}/>}
        else
            if(loginStatus == true)
                return <MainMenu />
    }

    return (
        <>
        <div className="openModal">
            <h1>Welcome Back!</h1>
            <button 
                className="openModalBtn" 
                onClick={() => {
                    setOpenModal(true)
                }}
            >
                Modal
            </button>           
            
            {openModal && <Modal closeModal={setOpenModal} loginStatus = {setLoginStatus}/>} {/* if statement, daca openModal este true atunci se executa functia Modal */}
            {OpenPages()}

        </div>
        

        

        </>
    )
}