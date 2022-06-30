import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import * as Icons from "react-icons/fa";

const UserMenu = (props) => {
    
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  /*
  const deleteUser = (userName) => {
    Axios.delete(`http://localhost:3001/api/delete/${userName}`)
  };*/

  const refreshToken = async () => {

    try{
      const res = await Axios.post("http://localhost:3001/api/refreshToken", {
        token: localStorage.getItem("refreshToken")
      });
  
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
    }
    catch (err){
      console.log(err);
      setError(true);
    }
  };

  const selectUserData = async (user) => {

    try{
      await axiosInstance.post("http://localhost:3001/api/select/userData/"+user, {
        username: userName
      }).then((response) => {
        setUser(response.data);
      });
    }
    catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    selectUserData(userName);
  },[user])

    return (
        <>
          <div className='UserBackgroundMenu'>
              <div className='UserContainer'>
                  <div className='userLogoContainer'></div>          
                  <div className='currentUserData'>
                    <div className='currentUserDataItems'>
                      <Icons.FaUserTie className='userLabelLogo'/> 
                      <label>User: {user.username}</label>
                    </div>
                    
                    <div className='currentUserDataItems'>
                      <Icons.FaIdCardAlt className='userLabelLogo'/>
                      <label>Id: {user.id}</label>
                    </div>
                    
                    <div className='currentUserDataItems'>
                      <Icons.FaMailBulk className='userLabelLogo'/>
                      <label>Email: {user.email}</label>
                    </div>
                    
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
                    <button onClick={() => updatePassword(userName)}>Update Password</button>

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
