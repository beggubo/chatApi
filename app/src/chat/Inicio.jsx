import React,{useState, useRef, useContext, useEffect} from "react";
import { Modal, ModalBody, Form, FormGroup ,Button, Input, Card, Row, Col  } from "reactstrap";
import {AuthContext} from './auth/auth-context';
import {actions} from '../actions/actions'
import { cio } from "../helpers/api";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes, faCommentAlt, faCircleNotch, faHandPaper, faPaperPlane, faCaretDown, faImage, faFileUpload  } from "@fortawesome/free-solid-svg-icons";
import Remitente from './components/Remitente'
import Destinatario from './components/Destinatario'
import ChatUsuario from './components/ChatUsuario'
import Mensaje from './components/Mensaje'
import Imagen from './components/Imagen'
import {io} from "socket.io-client"

export const Inicio = () => {
  const dispatch = useDispatch();
  const {onLogout, user} = React.useContext(AuthContext);  
  const { filename, origen, chats, mensajes } = useSelector(state => state.chat) 
  const remitente = JSON.parse(localStorage.getItem('@userChat'))    
  const [mensaje, setMensaje] = useState("")
  const [recibido, setRecibido] = useState(null) 
  const [activos, setActivos] = useState(null);   
  const [file,setFile] = useState('');
  const [imagePreviewUrl,setImagePreviewUrl] = useState('');     
  const [view, setView] = useState(false);
  const scrollRef = useRef()
  const socket = useRef()
  


  const cargarChats = () =>{    
    let userId = remitente.id     
    let iok = '{chats(id:'+userId+'){ id usuarioId remitenteId nodo {id nombres apellidos username filename } }}'
    dispatch(actions.GET_DATA('CHATS_DATA',iok))  
  } 
  const enviar = (e) =>{   
    e.preventDefault()           
    let remitenteId = remitente.id
    let chatId      = origen.id    
    let des         = origen.nodo.id       
    let iok = 'mutation { addMensaje(texto:"'+mensaje+'",tipo:"texto",filename:"default.jpg",remitenteId:'+remitenteId+',chatId:'+chatId+') { data { id texto remitenteId estado filename tipo createdAt }}}'                        
    dispatch(actions.SET_DATA('SET_MENSAJE',iok))  
    socket.current.emit("sendMessage",{
        remitenteId: remitenteId,
        destinatarioId: des,
        texto: mensaje,
        tipo: "texto",
        filename: "default.jpg"            
      })               
    setMensaje("")
  }
 
  useEffect(() => {
    socket.current = io((cio))
    socket.current.on("getMessage",data=>{        
        setRecibido({
            remitenteId: data.remitenteId,
            texto : data.texto,
            createdAt : Date.now(),
            /*chatId: data.chatId,*/
            tipo: data.tipo,
            filename: data.filename
            
        })        
    })
  
}, [])   

useEffect(()=>{
    socket.current.emit("addUser",remitente.id)
    socket.current.on("getUsers",users=>{
      console.log(users)
    })
},[])
  useEffect(() => {
    cargarChats()
  },[])  

  useEffect(()=>{ 
    if(recibido)
    { 
        dispatch({type:'SET_MENSAJE_RECIBIDO',data: recibido })                          
        
    }        
    setRecibido(null)
},[recibido]) 
useEffect(() => {
    scrollRef.current?.scrollIntoView({block:"end",behavior: "smooth"})
},[mensajes])

const toggleModalView = () => {        
  setView(!view)                  
};

 

const handleImageChange = (e) => {
  e.preventDefault();
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onloadend = () => {
    setFile(file)
    setImagePreviewUrl(reader.result)    
  };    
  reader.readAsDataURL(file);      
}

const handleSubmit = (e) =>{                     
  e.preventDefault();
  const formData = new FormData();        
  formData.append("file", file);       
  dispatch(actions.SET_UPLOAD_IMAGEN('mensajes',formData));   
  let newFile = file.name 
  let remitenteId = remitente.id
  let chatId      = origen.id    
  let des         = origen.nodo.id       
  let iok = 'mutation { addMensaje(texto:"images",tipo:"img",filename:"'+newFile+'",remitenteId:'+remitenteId+',chatId:'+chatId+') { data { id texto remitenteId estado filename tipo createdAt }}}'                        
  dispatch(actions.SET_DATA('SET_MENSAJE',iok))  
  socket.current.emit("sendMessage",{
      remitenteId: remitenteId,
      destinatarioId: des,
      texto: "imagen",
      tipo: "img",
      filename: newFile
    })               
  setMensaje("")
  setView(!view)  
  setFile(null)
  setImagePreviewUrl(null)
  
} 

        

return (
      <div className="main-contenido">
        <Row>
          <Col md="4" className="border-right">            
            <Remitente remitente={remitente}/>  
            <div className="contactSearch">
            
            <Row className="bg-white">
              <Col md={2}>
                <FontAwesomeIcon icon={faSearch} className="e-dest"/> 
              </Col>  
              <Col md={8}>
                  <FormGroup>                            
                  <Input
                      id="mensaje"
                      name="mensaje"                    
                      type="text"
                   
                  />
                  </FormGroup>
              </Col>                     
              <Col md={2}>            
                <FontAwesomeIcon icon={faCaretDown} className="e-dest"/>
              </Col>
            </Row> 
            </div>
            <div className="listaChat">
            {chats?.map((chati,index) =>(
                  <ChatUsuario 
                      key={index} 
                      chat={chati}                                              
                  /> 
              ))
            } 
            </div> 
            <Button  className="btn-primary btn-md" onClick={onLogout}>
            Salir</Button>                
          </Col>
          <Col md="8">
            <Row>
              <Col>
                <Destinatario destinatario={origen}/>  
              </Col>
            </Row>           
            <Row>
              <Col md="12" className="listaMensajes">
                {origen?.id > 0 ?
                  <div className="mensajesContenedor">
                      { mensajes.map((it,index)=>(
                          <div key={index} className="nn" ref={scrollRef}>
                          <Mensaje                                
                              message={it}
                              usuarioId={remitente.id}/>
                          </div>    
                      ))}
                  </div>: null
                  }
              </Col>
            </Row>
            <Row>
              <Col className="inputMensajes">  
              <Row>
                  <Col md="1">                 
                  <FontAwesomeIcon 
                    type="button"
                  icon={faImage} className="u-dest" onClick={()=>{setView(true)}}/> 
                  </Col>
                  <Col md="11">
                      <Form onSubmit={ enviar} >
                      <Row >
                          <Col md={11}>
                              <FormGroup>                            
                              <Input
                                  id="mensaje"
                                  name="mensaje"                    
                                  type="text"
                                  value={mensaje || ''}
                                  onChange={ (e) => setMensaje(e.target.value)}
                              />
                              </FormGroup>
                          </Col>                     
                          <Col md={1}>            
                          <FontAwesomeIcon icon={faPaperPlane} className="u-dest"/>   
                          </Col>
                      </Row> 
                      </Form> 
                  </Col>
              </Row>              
              </Col>
            </Row>           
          </Col>
        </Row>  
        <Modal isOpen={view} toggle={toggleModalView} className="imgBody">  
          <ModalBody className="imgConte">                     
          <div className="divImg">
          <div className="img-avatar">
            <img alt="preview" className="imgs" src={imagePreviewUrl} />
          </div>  
          <div className="img-btn">
          <FormGroup className="frmp mt-3">
           <Input
             type="file"
             id="file"
             name="formData"
             onChange={(e) => handleImageChange(e)}/>           
         </FormGroup>  
         <Button
             className={
                         file
                           ? "submitButton btn-success btn-md"
                           : "submitButton disabled btn-md"
                       }
             type="submit"
             onClick={(e) => handleSubmit(e)}>
             <FontAwesomeIcon icon={faPaperPlane} className="u-destu"/>   
           </Button>
          </div> 
        </div>
          </ModalBody>
      </Modal>         
      </div>      
    );
  };

  export default Inicio