import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import Sidebar from './SideBar/Sidebar.jsx';

export default function MainMenu () {

    const [barStatus, setBatStatus] = useState(true);
    
    

    return (
        <div className='AppMainPage'>
            <Sidebar />
        </div>
    )
}
//https://www.youtube.com/watch?v=5R9jFHlG6ik&ab_channel=PedroTech  8:09