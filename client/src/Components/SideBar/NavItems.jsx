import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SsidChartIcon from '@mui/icons-material/SsidChart'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AddIcon from '@mui/icons-material/Add';


export const navItems = [ 
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage"
    },
    {
        id: 2,
        title: "User",
        icon: <AccountCircleIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/userInfo"
    },
    {
        id: 3,
        title: "BarChart",
        icon: <BarChartIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/barchart"
    },
    {
        id: 4,
        title: "ScatterPlot",
        icon: <ScatterPlotIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/scatterplot"
    },
    {
        id: 5,
        title: "SsIdChart",
        icon: <SsidChartIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/ssidchart"
    },
    {
        id: 6,
        title: "DonutChart",
        icon: <DonutSmallIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/donutchart"
    }/*
    {
        id: 7,
        title: "Add",
        icon: <AddIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./mainpage/add"
    }
    {
        id: 8,
        title: "Logout",
        icon: <LogoutIcon />,
        nName: "nav-item",
        sName: "sidebar-item",
        path: "./logout"
    }*/
];