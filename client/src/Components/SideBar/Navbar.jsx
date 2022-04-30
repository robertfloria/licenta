import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "D:/GitHub/licenta/client/src/App.css";
import { navItems } from './NavItems';
import * as Icons from "react-icons/fa";
import { interpolateNumber } from 'd3';

export default function Navbar() {
    return(
        <>
            <nav className='navbar'>
                <Link to="/" className='navbar-logo'>
                    <Icons.FaPiedPiper />
                    PIPER
                </Link>

                <ul className='nav-items'>
                    {navItems.map((item) => {
                        return(
                        <li key={item.id} className={item.nName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            </nav>
        </>

    );
}


// https://www.youtube.com/watch?v=NN3fh6bJB90&ab_channel=Codamy  7:47