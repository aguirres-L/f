// Como los cod tipo hooks mantienen logica no vamos a usar codigo jsx 
// Solamente import useState
import { useState } from "react"

import { helpHtpp } from "../helpers/helpHttp";

export const useForm =(initialForm/* ,validateForm */)=>{
    const [form, setForm] = useState(initialForm);
    const [errors, setErr] = useState({}); // lo inicializo como un obj ya que si este obj no tiene ningun contenido quiere decir que la reques se cumple sin ningun erro. Solo contendra los datos del error 
    const [loading, setLoading] = useState(false); 
    const [response, setResponse] = useState(null); // "respon" hace referencia ala respuesta por parte de la reques 
    
  /*   const handleChange=(e)=>{
        const {name,value} = e.target; // destucturo e.target
        
        setForm({ // lo que hago en el setForm es hacer una copia de "form" gracias a "...form" y luego le idnico 
        ...form,            // que cada vez que se active el handleChange se añadan los nuevos valores al form copiado 
        [name]:value
        })                                                  // de esta forma los valores que cargue el user se veran reflejado en el estado "form"
    }
    
    
    const handleBlur=(e)=>{ // en Blur lanzamos las validacion cuando el formulario pierde el foco 
        handleChange(e)
                                            // aca mando a llamar a handleChange para poder actualizar form 
        setErr(validateForm(form))          // y luego le paso como parametro en setErr
    }
    
     */
    const handleSumbit=(e)=>{ // en handleSubmit vamos a trabajr el envio del fomrulario 
            e.preventDefault();
         //   setErr(validateForm(form))  // acutalizo los posbiles errores
           // alert("Eviando Formulario") // Si se muestra el arlet quiere decir que no se generó ningun error
            setLoading(true)
            
            helpHtpp().post("https://formsubmit.co/ajax/f.v.oxygen@gmail.com",{
                body: form,
                headers:{
                    "Content-Type":"application/json",
                    Accept :"application/json"
                }
            })
            .then((res)=>{  // Si res existe , en este then voy a trabajar los seteos de los elemento response y loading
            setLoading(false);
            setResponse(true)
            setForm(initialForm)
             })
            
    }



 // retun me devuelve un obj
    return {        // en lugar de hacer "from : from " gracias a la simplificacions de sintaxis de objt se puede hacer "form" Solo se puede hacer si el atributo del obj tiene el mismo nombre que el valor que tendra el obj
        form,
  //      errors,
   //     loading,
  //      response,
  //      handleChange,
  //      handleBlur,
        handleSumbit
    }

}