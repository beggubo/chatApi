const io = require("socket.io")(4000,{
    cors:{
        origin: "http://localhost:3000"
    }
});

let users = []

const addUser = (userId, socketId) =>{
    !users.some((item)=> item.userId === userId) &&
    users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter((item) => item.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };  

    io.on("connection",(socket) =>{     
        console.log("usuario conectado")     
        socket.on("addUser",(userId)=>{
            addUser(userId, socket.id);            
            io.emit("getUsers",users)
        })

        socket.on("sendMessage",({remitenteId, destinatarioId, texto, tipo, filename }) =>{ 
          
        const user = getUser(destinatarioId);            
        if(user){
                io.to(user.socketId).emit("getMessage",{
                    remitenteId,
                    texto,
                    tipo,
                    filename            
                })
            }
        });

    socket.on("disconnect", () => {
        console.log("usuario desconectado!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

});
