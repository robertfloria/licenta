import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import Navbar from './SideBar/Navbar';
export default function MainMenu () {

    const [barStatus, setBatStatus] = useState(true);
    
    return (
        <div>
            <Navbar />
        </div>
    )
}
