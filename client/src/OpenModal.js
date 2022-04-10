import Modal from "./Components/Modal";
import "./App.css";
import { useState, useEffect } from "react";

export default function OpenModal() {

    const [openModal, setOpenModal] = useState(false);

    return (
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
            
            {openModal && <Modal closeModal={setOpenModal}/>} {/* if statement, daca openModal este true atunci se executa functia Modal */}
        </div>
    )
}