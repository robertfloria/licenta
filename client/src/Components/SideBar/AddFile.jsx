import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import {Route, useNavigate} from 'react-router-dom';
import * as Icons from "react-icons/fa";

const AddFile = (e) => {

    let file = e.target.files[0];
    let reader = new FileReader();
    console.log(file);

    
}

export default AddFile;