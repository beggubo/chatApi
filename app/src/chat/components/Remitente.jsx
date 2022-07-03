import React from 'react';
import { api, apis } from "../../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faCommentAlt, faCircleNotch, faCaretDown  } from "@fortawesome/free-solid-svg-icons";
export default function Remitente ({remitente}){
    return(
        <div className="headerUsuario">
            <img className="img-perfil" alt="w" src={apis + "/static/images/usuarios/" + remitente.filename || ''} />  
            <FontAwesomeIcon icon={faBars} className="i-dest"/>
            <FontAwesomeIcon icon={faCommentAlt} className="i-dest"/>
            <FontAwesomeIcon icon={faCircleNotch} className="i-dest"/>            
        </div>
    )
}