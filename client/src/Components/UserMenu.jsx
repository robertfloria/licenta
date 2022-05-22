import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';
import jwt_decode from 'jwt-decode';
import {Route, useNavigate} from 'react-router-dom';
import * as Icons from "react-icons/fa";

const UserMenu = (props) => {
    
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  /*
  const deleteUser = (userName) => {
    Axios.delete(`http://localhost:3001/api/delete/${userName}`)
  };*/

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

  const axiosInstance = Axios.create();
  axiosInstance.interceptors.request.use(async (config) => {        // do something before every request
    
    let currentDate = new Date();
    const decodedToken = jwt_decode(localStorage.getItem("token"));
  
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = data.token;

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
        config.headers["authorization"] = localStorage.getItem("token");
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
  );

  const updatePassword = async (user) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosInstance.put("http://localhost:3001/api/update/password/"+user, {
      username: userName,
      password: newUserPassword
      });

      setSuccess(true);
      setNewUserPassword("");
    }
    catch (err){
      console.log(err);
      setError(true);
    }
  };
  
  const updateEmail = async (user) => {
    setSuccess(false);
    setError(false);
    try{
      await axiosInstance.put("http://localhost:3001/api/update/email/"+user, {
      username: userName,
      email: newUserEmail
    });

      setSuccess(true);
      setNewUserEmail("");
    }
    catch (err){
      console.log(err);
      setError(true);
    }
  };

    return (
        <>
          <div className='UserBackgroundMenu'>
              <div className='UserContainer'>
                  <div className='userLogoContainer'>
                    <Icons.FaUserCircle className='userLogo'/>
                  </div>
                  <div className='currentUserData'>
                    <label>User:</label>
                    <label>ceva:</label>
                  </div>
                  <hr id="line-user"></hr>
                
              </div>

              <div className='UserSecondContainer'>
                  <div className='userInfoItems'>
                    <button>Change credentials</button>
                    <button>Something</button>
                    <button>Something</button>
                  </div>
                  <hr id="line-user"></hr>
                  <div className='userInfoContainer'>
                    <h2>Update personal information</h2>
                    <label>Change Password :</label>
                    <input type="text" name="changePassword" onChange={(e) => {
                      setNewUserPassword(e.target.value);
                    }}
                    />
                    <button onChange={() => updatePassword(userName)}>Change Password</button>

                    <label>Change Email :</label>
                    <input type="text" name="changeEmail" onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}                     
                    />

                    <button onClick={() => updateEmail(userName)}>Update Email</button>

                  </div>
              </div>

          </div>
            
        </>           
    )
}
export default UserMenu;

/*}
    <div>
        <input type="text" name="newUserEmail" onChange={(e) => {
            setNewUserEmail(e.target.value);
          }}
        />
        <button onClick={updateEmail}>Update Email</button>   
        
        <input type="password" name="newUserPassword" onChange={(e) => {
            setNewUserPassword(e.target.value);
          }}
        />
        <button onClick={updatePassword}>Update Password</button>     
        <button onClick={() => {deleteUser(userName)}}>Delete User</button>        
    </div>*/