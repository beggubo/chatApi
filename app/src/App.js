import React from 'react';
import { Routes, Route} from "react-router-dom"
import Login from './chat/Login'
import Inicio from './chat/Inicio'
import AuthProvider from './chat/auth/AuthProvider'
import Protected from './chat/auth/Protected'
import './App.css';

const App = () =>{    
  return(
      <AuthProvider>
      <Routes>
         <Route index element={<Login />} />  
         <Route path="/" element={<Login />} />  
         <Route path="inicio" 
         element={
         <Protected>
             <Inicio />
         </Protected>           
         } />  
      </Routes>
      </AuthProvider>
  )
}

export default App
