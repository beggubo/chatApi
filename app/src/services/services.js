import { api, imgs } from "../helpers/api.js"

export const services ={
    GET_DATA,
    SET_DATA,
    UPLOAD_IMGS,
    LOGIN    
};
function UPLOAD_IMGS(payload, dato) {  
  const requestOptions = {
    method: "POST",  
    headers: {
     
      
    },  
    body: dato,
  };
  return fetch(
    `${imgs}/files/${payload}`,
    requestOptions
  ).then(handleResponse);
}
function LOGIN(params) {  
  const requestOptions = {
    method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },         
      body: JSON.stringify({query:params})
  };

  return fetch(`${api}/`, requestOptions)
    .then(handleResponse)
    .then((response) => {          
      if(response.data.login.usuario){               
        localStorage.setItem("@userChat", JSON.stringify(response.data.login.usuario));        
      } 
      return response;
    });
}

function SET_DATA(params){    

    const requestOptions={
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },  
         
          body: JSON.stringify({query: params })
        
    };
    return fetch(`${api}/`, requestOptions)
    .then(handleResponse);
}

function GET_DATA(params){       
  const requestOptions={
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },         
      body: JSON.stringify({query:params})
        
  };
  return fetch(`${api}/`, requestOptions)
  .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          
        }
  
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    });
  }