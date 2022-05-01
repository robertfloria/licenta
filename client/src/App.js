import React, { useState, useEffect } from "react";
import "D:/GitHub/licenta/client/src/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/SideBar/Navbar";

import Sidebar from "./Components/SideBar/Sidebar";

import OpenModal from './OpenModal';

import MainMenu from "./Components/MainMenu";

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
                <MainMenu />
                <Routes>
                    <Route path="/userInfo" element={<Sidebar />}></Route>
                    <Route path="/barchart" element={<OpenModal/>}></Route>                   
                </Routes>
            </BrowserRouter>
        </>

    );
};


