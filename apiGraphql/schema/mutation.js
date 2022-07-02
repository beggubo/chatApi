const usuarioService = require('../services/usuarioServices.js')
const mensajeService = require('../services/mensajeServices.js')
const chatService = require('../services/chatServices')
const filesService = require('../services/filesService')

const mutation = {
   
    createChat: async ({remitenteId,destinatarioId},context)=>{
        try{
            let dato ={
                usuarioId: destinatarioId,
                remitenteId
            }
            const datas  = await chatService.create(dato)  
            const data = datas.map(itt =>{                
                let dato = itt
                dato.nodo = itt.remitenteId === remitenteId ? itt.usuario : itt.remitente 
                return dato
            })
            
            return data 
        }catch(error){
            console.log(error)
        }
    },
    createUser: async ({nombres,apellidos,username,password},context)=>{
        try{
            let dato ={
                nombres,
                apellidos,
                username,
                password
            }
            return msn = await usuarioService.create(dato)            
        }catch(error){
            
        }
    },
    addMensaje: async ({texto, tipo, filename, remitenteId, chatId}, context) =>{  
   
        
       try{
           let dato = {
            texto,
            tipo,
            filename,
            estado : false, 
            remitenteId, 
            chatId                        
           }
            const dmensajes = await mensajeService.create(dato,chatId)        
            const mensajes = dmensajes.sort().reverse()

            return {
                data: mensajes,
                ok: true,
                error: ''
            }
       }catch(error){
            return {
                data: null,
                ok: false,
                error: error.message
            }
       }       
    },
   
    
};
module.exports = mutation