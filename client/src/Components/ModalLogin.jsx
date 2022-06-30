import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Route, useNavigate} from 'react-router-dom';

const LoginModal = (props) => {
  
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [loginRes, setLoginRes] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState("");
  
  Axios.defaults.withCredentials = true;
  
  const getLogin = () => {
    Axios.post("http://localhost:3001/api/login", {
      username: userName, 
      password: userPassword
    }).then((response) => {
      if(response.data.authorised == false){
        setLoginStatus(false);
        alert("password or username is wrong!")
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", userName);
        setUser(response.data);
        setLoginStatus(true);
      }       
  })};
  
  const deleteUser = (userName) => {
    Axios.delete(`http://localhost:3001/api/delete/${userName}`)
  };

  const updatePassword = () => {
    Axios.put("http://localhost:3001/api/update/password", {
      username: userName,
      password: newUserPassword
    });
    setNewUserPassword("");
  };

  const updateEmail = () => {
    Axios.put("http://localhost:3001/api/update/email", {
      username: userName,
      email: newUserEmail
    });
    setNewUserEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await Axios.post("http://localhost:3001/api/login", {
          username: userName, 
          password: userPassword
        });
      
        setUser(res.data);
    }
    catch (err){
      console.log(err);
    }
  };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const refreshToken = async () => {
  
    try{
      const res = await Axios.post("http://localhost:3001/api/refreshToken", {
        token: localStorage.getItem("refreshToken")
      });
    
      setUser({
        ...user,
        token: res.data.token,
        refreshToken: res.data.refreshToken
      })
    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    
      return res.data;
    }
    catch (err){
      console.log(err);
    }
  }
  const axiosInstance = Axios.create(); // because for authentication request or get req we don't need to refresh token in before every req
  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try{
      await axiosInstance.delete("http://localhost:3001/api/delete/"+id, {    
    
        headers:{
          "authorization" : localStorage.getItem("token")
        }
      });
      setSuccess(true);
    }
    catch (err){
      console.log(err);
      setError(true);
    }
  }
  const userAuthenticated = () => {
    axiosInstance.get("http://localhost:3001/api/userAuthStatus", {
      headers:{
        "authorization" : localStorage.getItem("token")
      }}).then((response)=>{
        console.log(response);
      
      })
  }
  axiosInstance.interceptors.request.use(async (config) => {        // do something before every request
    let currentDate = new Date();
    const decodedToken = jwt_decode(localStorage.getItem("token"));
  
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = data.token;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
  );
  const navigate = useNavigate();
  useEffect(() => {
  
    if(user){
      navigate("/mainpage");
    }
  },[user])
  
    return (
        <>
            <div className='modalLogin'>
                <div className='title'>
                    <h1>Login</h1>
                </div>
                <form className='form'>
                    <label>Username</label>
                    <input type="text" name="userName" onChange={(e) => {
                        setUserName(e.target.value);
                    }} 
                    />

                    <label>Password</label>
                    <input type="password" name="userPassword" onChange={(e) => {
                        setUserPassword(e.target.value);
                    }} 
                    />    
                    <a href='mailto:robertfloria27@gmail.com?Subject=Dada'>Forgot Password?</a>                 
                </form> 

                <div className='footer'>
                    <hr id="line"></hr>
                    <button onClick={() => props.closeModal(false)} id='cancelButton'>Cancel</button>
                    <button onClick={getLogin}>Login</button>
                    
                    <p>Need an Account?</p>
                    <a className='aaa' onClick={() => {
                        props.openRegister(true); props.openLogin(false);
                        }}>Sign Up
                    </a>

                    
                </div>                       
            </div>
        </>           
    )
}
export default LoginModal;
