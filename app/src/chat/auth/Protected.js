import React,{useContext} from "react";
import { Navigate } from 'react-router-dom';
import {AuthContext} from './auth-context';
  
const Protected = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('@userChat'))   
    if (!user) {
      return <Navigate to="/" replace />;    }
  
    return children;
  };

export default Protected  