import React, { useState, useEffect } from "react";
import "D:/GitHub/licenta/client/src/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/SideBar/Navbar";

import OpenModal from './OpenModal';

import MainMenu from "./Components/MainMenu";
import Modal from "./Components/Modal";
import AllCharts from "./DataVisualization/AllCharts";


export default function AppNav() {

    const white = ()=>{
        return(
            <>
                <h1 className="mama">Hello!</h1>
            </>
        )
    };

    return(
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route path="/mainpage/barchart" element={<AllCharts />}></Route>
                    <Route path="/" element={<Modal />}></Route>
                    <Route path="/mainpage" element={<MainMenu />}></Route>  
                    <Route path="/mainpage/signup" element={<Modal />}></Route>          
                </Routes>
            </BrowserRouter>
        </>

    );
};


