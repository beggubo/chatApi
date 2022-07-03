import React,{useEffect} from 'react';
import {AuthContext} from './auth-context'
import { useNavigate } from 'react-router-dom';
import { actions } from '../../actions/actions'
import { useSelector, useDispatch } from "react-redux"
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user, usuario } = useSelector(state=>state.chat)
    const dispatch = useDispatch()     
    const handleLogin = () => {      
      let username = usuario.username
      let password = usuario.password
      let iok = '{ login(username:"'+username+'",password:"'+password+'") { auth usuario { id username filename nombres apellidos } message }}'                    
      dispatch(actions.LOGIN(iok))  
      navigate('/inicio');
      
    };
  
    const handleLogout = () => {
      dispatch(actions.LOGOUTH())
      navigate('/');
    };
  
    const value = {
      user,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
    useEffect(() => {
      navigate('/inicio');      
    }, [user]);
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider
