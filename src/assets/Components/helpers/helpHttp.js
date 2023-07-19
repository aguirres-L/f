
// En este ejer lo que vamos a hacer es Crear un componente que nos devuelve la requeste del metodo AJAX - CRUD 
//      POS-PUT-GET-DELETE

export const helpHtpp=()=>{
    
    // creo la function que filtra la info que nos envia el user
    const customFetch=(endpoint,options)=>{
    const defaulHeader={
        accept:"application/json"
    }
        
    // nos solicitan un AbortControll para poder controlar cuando la api no me manda la request
    
    const controller = new AbortController();
    options.signla = controller.signal;     // de esta fomra a option le agrego signla , Me permite abortar la request
    
    options.method = options.method||"GET" // le indico que en option se le va a pasar el method pero si no se le pasa, por defecto sera "GET"
    options.header = options.header ? {...defaulHeader,...options.header}:options.header
    // le indico que si le pasan header sera el valor por defaul sumado al que le pasen
    
    options.body = JSON.stringify(options.body)||false
        // body se usa en muy pocas reuqes, y por ese motivo indico que si no le pasan esa option , se elimine, ya que afectaria a las demas request
    if(!options.body) delete options.body
    
    //      Creo un setTimeout para poder cancelar la request al momento de demoras
    
   setTimeout(()=> controller.abort(),3000) 
    
                                    // genero el "fecth" e indico que si la res , es ok se tranforma en json pero si no es ok se envia un err y 
      return fetch(endpoint,options)//  Tambien se manda un status y statusText con un corto sicruito por las dudas de que no me envien nada
    .then((res)=>res.ok? res.json():Promise.reject({
            err:true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrio un Error"
    }))
    .catch((err)=>err)
    
    }
    // indico que si el user no me pasa las option , se tranforme en un objt
    const get =(url,options={})=>customFetch(url,options)
    
    const post =(url,options={})=>{
    options.method ="POST"
       return customFetch(url,options)        // Aca le paso el method añadiendolo a options y luego se lo paso a la funtion customFetch
    }
    
    
    const put =(url,options={})=>{
    options.method = "PUT"
       return customFetch(url,options)
    }
    const del =(url,options={})=>{
    options.method="DELETE"
       return customFetch(url,options)
    }
    
    
    return{
        get,
        post,
        put,
        del
    }
}