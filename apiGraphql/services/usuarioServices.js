const db = require("../models")
const sequelize = require('sequelize');
const Op = sequelize.Op

const { Usuario } = db;

exports.getItem = (pky) =>{
    return new Promise((resolve, reject)=>{
        Usuario.findByPk(pky,{
            raw: true,
            nest: true
        })
        .then((row)=>{            
            resolve(row)
        })
        .catch((reason)=>{
            reject({message: reason.message})
        })
    })
}

exports.getAll = (pky) =>{    
    return new Promise((resolve, reject)=>{        
        Usuario.findAll({
            raw:true,
            nest:true,
            order:[['username','ASC']]            
        })
        .then((row)=>{
            resolve(row)
        })
        .catch((reason)=>{
            reject({message: reason.message})
        })
    })
}

exports.create = (dato) =>{
    const { username } = dato
    return new Promise((resolve, reject) =>{
        Usuario.findOne({
            nest: true,
            raw: true,
            where: { username : username }
        })
        .then((row)=>{            
           if(!row)
           { 
            Usuario.create(dato)
            .then((rw)=>{
               resolve({message: "registro correcto"})
            })                
            
           }else{            
            resolve({message: "el usuario ya existe"})
             
           }           
        })        
        .catch((reason)=>{            
            reject({message: reason.message})
        })
    })
}

exports.update = (dato,datoId) =>{
    return new Promise((resolve, reject) =>{
        Usuario.update(dato,{
            where: { id: datoId }
        })
        .then((xrow)=>{
            Usuario.findByPk(datoId,{
                raw: true,
                nest: true
            })
            .then((row)=>{            
                resolve(row)
            })
            .catch((reason)=>{
                reject({message: reason.message})
            })
        })
    })
}

exports.login = (username,password) =>{
    return new Promise((resolve,reject)=>{
        console.log(username)
        console.log(password)
        Usuario.findOne({
            where: { username : { [Op.eq]: username}},            
        })
        .then((user)=>{
            if(!user){
                resolve({
                    success: false,
                    message: "Authentication fallida . Usuario no existe.",
                    usuario: null,
                })
            }else{
                user.comparePassword(password, (err, isMatch) => {            
                    if (isMatch && !err) {
                      let payload = { user_id: user.id, username: user.username };                        
                      resolve({
                        auth: true,
                        message: "Acceso correcto",
                        usuario: user,
                        /*token: token,*/
                      });              
                    } else {
                      resolve({
                        success: false,
                        message: "Autenticación fallida. contraseña incorrecta.",
                        usuario: null,
                      });              
                    }
                  });

            }
        })
        .catch((reason)=>{
            console.log(reason)
            reject({message: reason.message})
        })

    })
}
