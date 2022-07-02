const db = require("../models")
const jwt = require("jsonwebtoken");
const sequelize = require('sequelize');
const Op = sequelize.Op

const { Chat, Usuario } = db;

exports.create = (dato) =>{    
    return new Promise((resolve, reject)=>{ 
        const { remitenteId } = dato       
        Chat.create(dato)
        .then((row)=>{ 

            Chat.findAll({
                raw:true,
                nest:true,
                order:[['id','ASC']],                        
                where:{
                    [Op.or]: [{ usuarioId: remitenteId }, { remitenteId: remitenteId }],  
                },
                include:[
                  {model:Usuario,as:"usuario",attributes:["id","nombres","apellidos","username","filename"]},
                  {model:Usuario,as:"remitente",attributes:["id","nombres","apellidos","username","filename"]}                
                ]            
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
exports.update = (remitenteId,pky) =>{    
    return new Promise((resolve, reject)=>{  
       
        Chat.findByPk(pky,{
            raw: true,
            nest: true
          })    
        .then((row)=>{            
            let numRem = remitenteId ===  row.remitenteId ?  row.numRemitente    : 0
            let numDes = remitenteId ===  row.usuarioId   ?  row.numDestinatario : 0 
            let ii = row
            ii.numRemitente     = numRem
            ii.numDestinatario  = numDes
                Chat.update(ii,{
                    where: { id : ii.id}
                })
                .then((xrow)=>{                    
                    Chat.findAll({
                        raw:true,
                        nest:true,
                        order:[['id','ASC']],                        
                        where:{
                            [Op.or]: [{ usuarioId: remitenteId }, { remitenteId: remitenteId }],  
                        },
                        include:[
                          {model:Usuario,as:"usuario",attributes:["id","nombres","apellidos","username","filename"]},
                          {model:Usuario,as:"remitente",attributes:["id","nombres","apellidos","username","filename"]}                
                        ]            
                    })
                    .then((row)=>{  
                               
                        resolve(row)
                    })
                    .catch((reason)=>{
                        reject({message: reason.message})
                    })
                })
        }) 
        .catch((reason)=>{   
            console.log(reason)         
            reject({message: reason.message})
        })                
        .catch((reason)=>{            
            reject({message: reason.message})
        })
    })      

}

exports.getAll = (pky) =>{    
    return new Promise((resolve, reject)=>{        
        Chat.findAll({
            raw:true,
            nest:true,
            order:[['id','ASC']],                        
            where:{
                [Op.or]: [{ usuarioId: pky }, { remitenteId: pky }],  
            },
            include:[
              {model:Usuario,as:"usuario",attributes:["id","nombres","apellidos","username","filename"]},
              {model:Usuario,as:"remitente",attributes:["id","nombres","apellidos","username","filename"]}                
            ]            
        })
        .then((row)=>{  
                   
            resolve(row)
        })
        .catch((reason)=>{
            reject({message: reason.message})
        })
    })
}
