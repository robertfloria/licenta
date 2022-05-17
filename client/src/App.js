import React, { useState, useEffect } from "react";
import "D:/GitHub/licenta/client/src/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OpenModal from './OpenModal';

import MainMenu from "./Components/MainMenu";
import Modal from "./Components/Modal";
import ReturnChart3 from "./DataVisualization/ReturnChart3";
import Navbar from "./Components/SideBar/Navbar";
import Chart5 from "./DataVisualization/Chart5";


export default function AppNav() {

    return(
        <div className="AppMainPage">
            <BrowserRouter>
                <Navbar />
                <Routes>                
                    <Route path="/mainpage/barchart" element={<ReturnChart3 />}></Route>
                    <Route path="/" element={<Modal />}></Route>
                    <Route path="/login" element={<Modal />}></Route>        
                    <Route path="/mainpage/donutchart" element={<Chart5 />}></Route> 
                </Routes>
            </BrowserRouter>
        </div>

    );
};
