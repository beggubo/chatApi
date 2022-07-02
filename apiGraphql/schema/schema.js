const { buildSchema } = require('graphql')

const schema = buildSchema(`
    scalar Date  
    scalar Upload

    type Query {        
        chats(id: Int): [Chat]                
        mensajes(id: Int): [Mensaje]        
        login(username: String!,password: String!): Auth  
        usuarios : [Usuario]                
    }  
    type Mutation {                        
        createUser(nombres:String,apellidos:String,username: String, password: String) : Msn
        addMensaje(texto: String!, tipo:String!, filename: String!, remitenteId: Int!, chatId: Int!) : MensajeResponse            
        createChat(remitenteId:Int,destinatarioId: Int) : [Chat]            
    }
    type Usuario {
        id: ID!
        nombres: String!
        apellidos: String!
        password: String!
        username: String!
        filename: String
        numMensajes : Int                                
        createdAt: Date
    }
    type Mensaje{
        id: ID!
        texto: String
        estado: Boolean
        remitenteId: Int
        remitente: String
        tipo: String
        filename: String
        chatId: Int
        createdAt : Date
    }  
    type Usuarios{
        usuarios: [Usuario]
    }
    type Mensajes{
        mensajes: [Mensaje]
    }
    type MensajeResponse {
        data: [Mensaje]
        error: String
        ok: Boolean
    }
    type Auth{
        auth: Boolean,
        message: String,
        usuario: Usuario
    }
    type Chat{
        id: Int        
        usuarioId: Int        
        remitenteId: Int      
        nodo: Usuario        
    }   
    type Msn{
        message: String
    } 
    
`);

module.exports = schema;
