import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import App from '../DataVisualization/App.jsx';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Route, useNavigate} from 'react-router-dom';
import * as Icons from "react-icons/fa";

const UserMenu = (props) => {
    
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
                    <input type="text" name="changePassword"></input>
                    <label>Change Email :</label>
                    <input type="text" name="changeEmail"></input>
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