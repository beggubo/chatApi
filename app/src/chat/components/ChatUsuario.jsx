import React,{useState} from 'react';
import { api, apis } from "../../helpers/api";
import { useSelector, useDispatch} from "react-redux"
import { actions} from '../../actions/actions'


export default function ChatUsuario ({chat}){    
    const dispatch = useDispatch();    
    const asignar = (destin) => {
        dispatch({type:'ASIGNAR_ORIGEN',origen:destin })
        let userId =destin.id 
        let iok = '{mensajes(id:'+userId+'){ id texto estado createdAt remitenteId filename tipo }}'     
        dispatch(actions.GET_DATA('MENSAJES_DATA',iok))               
    }    
    
    return(
       <div 
        className="nodoChat"
        onClick={()=>{asignar(chat)}}>
           <div className="imagen">
            <img className="img-perfil" alt="w" src={apis + "/static/images/usuarios/" + chat.nodo.filename} />                                       
           </div>    
           <div className="user">
            <p> {chat.nodo.nombres} , {chat.nodo.apellidos} </p>              
           </div>                    
       </div> 
    )
}