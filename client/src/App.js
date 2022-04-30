import React, { useState, useEffect } from "react";
import "D:/GitHub/licenta/client/src/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/SideBar/Navbar";

export default function AppNav() {

    return(
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route></Route>
                </Routes>
            </BrowserRouter>
        </>

    );
};


