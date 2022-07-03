import React,{useState} from 'react';
import { api, apis } from "../../helpers/api";
import { Input, Row, Col, FormGroup, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSearch, faBars, faEllipsisV, faImage , faUpload  } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch} from "react-redux"
import { actions} from '../../actions/actions'

const  Imagen = ({upload})=> {
    const dispatch = useDispatch();
    const [file,setFile] = useState('');
    const [imagePreviewUrl,setImagePreviewUrl] = useState('');    

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
        setTimeout(() => { 
            upload()
        }, 1000);

    }  
    return(        
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
    )
}

export default Imagen