import Modal from "./Components/Modal";
import "./App.css";
import { useState, useEffect } from "react";
import App from './DataVisualization/App.jsx';

export default function OpenModal() {

    const [openModal, setOpenModal] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [openCharts, setOpenCharts] = useState(false);

    const OpenPages = () => {
        if(openModal == true && loginStatus == false)
            {return <Modal closeModal={setOpenModal} loginStatus = {setLoginStatus}/>}
        else
            if(loginStatus == true)
                return <App />
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
            
            {/*{openModal && <Modal closeModal={setOpenModal} loginStatus = {setLoginStatus}/>} {/* if statement, daca openModal este true atunci se executa functia Modal */}
            {OpenPages()}

        </div>
        {loginStatus && <App/>}
        </>
    )
}