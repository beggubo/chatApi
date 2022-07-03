import { services } from "../services/services";
import { Routes, Route, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom'

export const actions = {
    GET_DATA,
    SET_DATA,
    LOGIN,
    LOGOUTH,
    SET_UPLOAD_IMAGEN
   
};

function SET_UPLOAD_IMAGEN(payload, data) {
    return (dispatch) => {    
      /*dispatch({type:'SET_LOADING',state:true})*/
      services
      .UPLOAD_IMGS(payload, data)
        .then((response) => {              
         
        })
        .catch((err) => {        
          /*dispatch({type:'SET_LOADING',state:false})*/
        });
    };
}

function LOGOUTH() {        
    return (dispatch) => {                    
      localStorage.removeItem("@userChat");            
      dispatch({ type: "SET_LOGOUT"});
    };
  }

function LOGIN(params) {   
    return (dispatch) => {    
      services
        .LOGIN(params)
        .then((response) => {   
            console.log(response)                             
            if(response.data.login.usuario){                
                dispatch({ type: "SET_LOGIN",data:response.data.login.usuario});
            }            
        })
        .catch((err) => {          
          
        });
    };
}

function SET_DATA(payload,params){
    return (dispatch) =>{
        services.SET_DATA(params)
        .then((response)=>{               
            dispatch(resRedux(payload,response.data.addMensaje))
            /*dispatch({type:'SET_IMG',state:"default.jpg"}) */
        })
    }
}
function GET_DATA(payload,params){
    return (dispatch) =>{
        services.GET_DATA(params)
        .then((response)=>{    
        
            dispatch(resRedux(payload,response.data))
            
        })
    }
}

export function resRedux(xredux, result) {     
    return {
      type: xredux,
      response: result
    };    
  }