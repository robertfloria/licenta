import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import "D:/GitHub/licenta/client/src/App.css";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Button() {
    return(
        <>
            <Link to="signup">
                <button className='btn'>
                    <LogoutIcon />
                    <span>Logout</span>
                </button>
            </Link>
        </>
    );
}