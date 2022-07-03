import React from 'react';
import { api, apis } from "../../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faEllipsisV   } from "@fortawesome/free-solid-svg-icons";
export default function Destinatario ({destinatario}){
    return(        
        <div className="headerDestinatario">
        { destinatario.nodo.id ?
            <>            
            <img className="img-perfil" alt="w" src={apis + "/static/images/usuarios/" + destinatario.nodo.filename || ''} />              
            <p>{destinatario.nodo.nombres} {destinatario.nodo.apellidos} </p>
            <FontAwesomeIcon icon={faEllipsisV} className="i-dest"/>
            <FontAwesomeIcon icon={faSearch} className="i-dest"/>
            
            </>
            : null
        } 
        </div>           
    )
}