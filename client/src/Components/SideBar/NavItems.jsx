import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AddIcon from '@mui/icons-material/Add';


export const navItems = [ 
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./"
    },
    {
        id: 2,
        title: "User",
        icon: <AccountCircleIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./userInfo"
    },
    {
        id: 3,
        title: "BarChart",
        icon: <BarChartIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./barchart"
    },
    {
        id: 4,
        title: "PieChart",
        icon: <PieChartIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./piechart"
    },
    {
        id: 5,
        title: "SsIdChart",
        icon: <SsidChartIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./ssidchart"
    },
    {
        id: 6,
        title: "DonutChart",
        icon: <DonutSmallIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./donutchart"
    },
    {
        id: 7,
        title: "Add",
        icon: <AddIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./add"
    }/*,
    {
        id: 8,
        title: "Logout",
        icon: <LogoutIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./logout"
    }*/
];