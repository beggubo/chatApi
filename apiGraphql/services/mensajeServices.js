const db = require("../models")
const sequelize = require('sequelize');
const Op = sequelize.Op

const { Mensaje, Usuario, Chat } = db;



exports.getAll = (chatId) =>{
    return new Promise((resolve, reject)=>{            
        Mensaje.findAll({
            raw:true,
            nest:true,                       
            limit:15,               
            order:[['id','DESC']],                        
            where: { chatId: chatId}            
        })
        .then((row)=>{                 
            resolve(row)
        })
        .catch((reason)=>{   
            console.log(reason)         
            reject({message: reason.message})
        })
    })
}

exports.create = (dato,chatId) =>{         
    return new Promise((resolve, reject) =>{        
        Mensaje.create(dato)
           .then((xrow)=>{                   
                Mensaje.findAll({
                    raw:true,
                    nest:true,          
                    limit:15,               
                    order:[['id','DESC']],                        
                    where: { chatId: chatId}            
                })
                .then((rows)=>{  
                              
                    resolve(rows)
                })
                .catch((reason)=>{                   
                    reject({message: reason.message})
                })                     
            })                    
        .catch((reason)=>{            
            reject({message: reason.message})
        })
    })
}

exports.delete = (pky) =>{
    return new Promise((resolve, reject) =>{        
        Mensaje.destroy({
            where:{
                id: Number(pky)
            }
        })
        .then((row)=>{                                      
              resolve(row)
            })            
        .catch((reason)=>{            
            reject({message: reason.message})
        })
    })
}

exports.update = (dato,datoId) =>{          
    return new Promise((resolve, reject) =>{
        Mensaje.update(dato,{
            where: { id: Number(datoId)}
        })
        .then((row)=>{                            
            resolve(row)
        })
        .catch((reason)=>{
            console.log(reason)
            reject({message: reason.message})
        })
    })
}