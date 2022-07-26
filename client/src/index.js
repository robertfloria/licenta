import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './Components/MainMenu';
import App from './DataVisualization/App'; // data visualization
import OpenModal from './OpenModal';  // login/register
import Navbar from "./Components/SideBar/Navbar";
import AppNav from "./App";
import Chart2 from './DataVisualization/Chart2';
import { TableGrid } from './Components/Table/Table';

// ReactDOM.render(<AppNav />, document.getElementById('root'));
ReactDOM.render(<TableGrid />, document.getElementById('root'));
