import React from 'react';
import { useState, useEffect } from "react";
import "../App.css";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AddIcon from '@mui/icons-material/Add';

export default function Sidebar () {

    const [barStatus, setBatStatus] = useState(true);
    
    const sideBarData = [ 
        {
            title: "Home",
            icon: <HomeIcon />,
            link: "/home"
        },
        {
            title: "User",
            icon: <AccountCircleIcon />,
            link: "/Account"
        },
        {
            title: "BarChart",
            icon: <BarChartIcon />,
            link: "/Barchart"
        },
        {
            title: "PieChart",
            icon: <PieChartIcon />,
            link: "/Piechart"
        },
        {
            title: "SsIdChart",
            icon: <SsidChartIcon />,
            link: "/Ssidchart"
        },
        {
            title: "DonutChart",
            icon: <DonutSmallIcon />,
            link: "/Donutchart"
        },
        {
            title: "Add",
            icon: <AddIcon />,
            link: "/Add"
        },
        {
            title: "Logout",
            icon: <LogoutIcon />,
            link: "/Logout"
        }
    ];

    return (
        <div className='sideBarBackground'>
            <div className='sideBar'> 
                <ul className='sideBarList'>
                    {sideBarData.map((val, key) => {
                        return (
                            <li key={key} className='row' 
                            id={window.location.pathname == val.link ? "active" : ""} 
                            onClick={()=> {window.location.pathname = val.link}}
                            >
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>{val.title}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
//https://www.youtube.com/watch?v=5R9jFHlG6ik&ab_channel=PedroTech  8:09