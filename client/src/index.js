import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './Components/MainMenu';
import App from './DataVisualization/App'; // data visualization
import OpenModal from './OpenModal';  // login/register
import Navbar from "./Components/SideBar/Navbar";
import AppNav from "./App";
import Chart3 from './DataVisualization/ReturnChart3';
import ReturnChart3 from './DataVisualization/ReturnChart3';

ReactDOM.render(<AppNav />, document.getElementById('root'));
//ReactDOM.render(<ReturnChart3 />, document.getElementById('root'));

