const initialState ={
    data:[],  
    mensajes:[],   
    user:{},
    filename:'',
    usuario:{
      username:'',
      password:''
    },    
    chats:[], 
    chatId:0,
    login:false,
    origen:{
        id:0,
        remitenteId:0,
        usuarioId:0,
        nodo:{
          id:0,
          username:"",
          filename:"",
          numMensajes:0,
        }
    }

}

export function chat(state = initialState, action){

    switch(action.type){
        case "CHAT_LOGIN":
          return {          
          ...state,
          usuario:
          {...state.usuario,
            [action.props]: action.value
          }
        };        
        case "SET_IMG":            
        return {
          ...state,
          filename: action.state
        };
        case "CHATS_DATA":            
        return {
          ...state,
          chats: action.response.chats
        };
        case "LOGIN_SUCCESS":
          return {
            login: action.data,           
        }; 
        case "USERS_DATA":            
        return {
          ...state,
          data: action.response.usuarios          
        };
        case "USERS_DATA_RESET":            
        return {
          ...state,
          data: []
        };
        case "MENSAJES_DATA":            
        return {
          ...state,
          mensajes: action.response.mensajes
        };
        case "SET_MENSAJE":            
        return {
          ...state,
          mensajes: action.response.data
        };
        case "SET_LOGIN":            
        return {
          ...state,
          user: action.data
        };
        
        case "SET_LOGOUT":            
        return {
          ...state,
          user: initialState.user,
          chats:[],
          mensajes:[]          
        };
        case "SET_MENSAJE_RECIBIDO":            
        return {
          ...state,
          mensajes: [...state.mensajes,action.data]
        };
        case "MENSAJES_DATA_RESET":            
        return {
          ...state,
          mensajes: []
        };
        case "ASIGNAR_ORIGEN":            
        return {
          ...state,
          origen: action.origen,
          chatId: action.chat
        };
        case "ASIGNAR_ORIGEN_RESET":            
        return {
          ...state,
          origen: initialState.origen
        };

        default:
            return state;
    }
}    