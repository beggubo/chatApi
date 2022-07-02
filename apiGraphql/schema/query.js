const usuarioService = require('../services/usuarioServices.js')
const mensajeService = require('../services/mensajeServices.js')
const chatService = require('../services/chatServices.js')

const query = { 
    chats: async ({id},context) =>{                
        const datas =  await chatService.getAll(id)    
        let data = datas.map(itt =>{
            let dato              = itt
            dato.nodo             = itt.remitenteId === id ? itt.usuario : itt.remitente              
            return dato
        })                   
       
        return data
    }, 
  
    mensajes: async ({id},context) =>{
        const dmensajes = await mensajeService.getAll(id)
        const mensajes = dmensajes.sort().reverse()
        return mensajes
    },    
    login: async ({username,password},context) =>{
        return await usuarioService.login(username,password)
    },
    usuarios: async()=>{
        return await usuarioService.getAll()
    }  

};

module.exports = query;