import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import "D:/GitHub/licenta/client/src/App.css";
import AddIcon from '@mui/icons-material/Logout';

export default function AddButton() {
    return(
        <>
            <button className='btn'>
                <AddIcon />
            </button>
        </>
    );
}