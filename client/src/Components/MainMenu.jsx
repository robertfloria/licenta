import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import Sidebar from './SideBar/Sidebar.jsx';
import Navbar from './SideBar/Navbar';
export default function MainMenu () {

    const [barStatus, setBatStatus] = useState(true);
    
    

    return (
        <div className='AppMainPage'>
            <Navbar />
        </div>
    )
}
//https://www.youtube.com/watch?v=5R9jFHlG6ik&ab_channel=PedroTech  8:09