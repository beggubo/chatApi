import Moment from "react-moment"
import { api, apis, imgs } from "../../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";  

export default function Message({ message, usuarioId }) {
  return (  
      <>
      { message.tipo !== 'img' ?        
      <div 
        className={Number(message.remitenteId) === Number(usuarioId) ? "send":"get"}>
        
        <p className="msn">{message.texto}</p>        
          <div className="mens">
              <p className="hora"><Moment format="HH:mm">{message.createdAt}</Moment></p>      
              <span>{message.estado ? <FontAwesomeIcon icon={faCheckDouble}  className="azul"/>:
              <FontAwesomeIcon icon={faCheck} className="gris"/>}</span>
          </div>                      
      </div>: 
      <div 
      className={Number(message.remitenteId) === Number(usuarioId) ? "sendImg":"getImg"}>      
      <img className="img-chat" alt="w" src={imgs + "/static/imagenes/" + message.filename || ''} /> 
     
        
    </div>
    }
    </>
  );
}    

             