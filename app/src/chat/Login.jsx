import React,{useContext} from "react";
import {AuthContext} from './auth/auth-context';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Row, Form, FormGroup, Col, Label, Button, Input, ButtonGroup  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";  


export const Login = () => {      
    const dispatch = useDispatch()  
    const {onLogin} = React.useContext(AuthContext);      
    const { usuario } = useSelector(state => state.chat)   
    const changeHandler = event => {          
      const { name, value } = event.target              
      dispatch({ type: 'CHAT_LOGIN', props: name, value: value});     

    }


      return (
        <div className="main-contenido">
          <div className="loginContenido">
            <div className="loginImagen">
              <p>Beggu-Chat</p>
            </div>
            <div className="loginFormulario">
            <Form className="form-login mt-3" onSubmit={onLogin}>
              <h5>Iniciar Sessión</h5>
              <div className="input_contenedor">
                <div className="io-blue">
                  <FontAwesomeIcon icon={faUser} />
                </div>  
                <div className="input-blue">
                <Input
                      type="text"
                      name="username"
                      id="username"
                      value={usuario.username}
                      placeholder="username"
                      onChange={(e)=>{changeHandler(e)}}
                      onInvalid={(e) => e.target.setCustomValidity('campo necesario !!')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />       
                </div> 
              </div>   
              <div className="input_contenedor">
                <div className="io-blue">
                  <FontAwesomeIcon icon={faKey} />
                </div>  
                <div className="input-blue">
                <Input
                      type="password"
                      name="password"
                      id="password"
                      value={usuario.password}
                      placeholder="password"
                      onChange={(e)=>{changeHandler(e)}}
                      onInvalid={(e) => e.target.setCustomValidity('campo necesario !!')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />       
                </div> 
              </div> 
              <div className="input_contenedor">               
                <div className="input-button">
                  <Button type="submit" className="btn-primary btn-md">
                    <FontAwesomeIcon icon={faLock} />
                    {' '} Ingresar
                  </Button>      
                </div> 
              </div>  
          
          </Form>            
            </div>
          </div>
        </div>  
      );
    };
export default Login    