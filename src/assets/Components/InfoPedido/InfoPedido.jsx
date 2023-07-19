import React, { useContext, useEffect } from "react";
import "./InfoPedido.css";
import DistanciaContext from "../Context/Distancia/Distancias";
import { useForm } from "../Detalle/useForm";



  const validateForm =(form)=>{
    let errors={} // creo esta variabel para poder almacenar o manejrar con los erros que me devuelven validateForm en el  modulo "useForm"
    
    // creo variable para poder almacenar los valores de expreciones regulares 
    
    let  regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let  regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,20}$/;
    
    
    if(!form.name.trim()){
        errors.name = "El campo Nombre es requerido"
    }else if(!regexName.test(form.name.trim())){                // El metodo "test()" analiza lo que se va a testear con lo que tenemos en expre
        errors.name= "El campo 'Nombre' solo recibe letras y espacios en blanco "   // en este caso si el user pasa number lanza el error
    }
    
    if(!form.email.trim()){
        errors.email = "El campo 'Correo' es requerido"
    }else if(!regexEmail.test(form.email.trim())){              
        errors.email= "El campo 'Email' no es valido "   
    }
    
    
    if(!form.subject.trim()){ // Comoo el input de subject no hace falta validarlo ya que no tiene mucha importancia 
        errors.subject = "El campo Asuntos es requerido"
    }
    
    if(!form.comments.trim()){
        errors.comments = "El campo no puede estar vacio"
    }else if(!regexComments.test(form.comments.trim())){
         errors.comments = "El campo recibe un limite de 20 palabras "
    }
    
    return errors;
 }
 

export default function InfoPedido() {
  const {
    Partida,
    Destino,
    kilometros,
    setKilometros,
    shippingValue,
    setShippingValue,
    remitente,
    destinatario,
    setDestinationPosition,setRemitente,
    setDestinatario,
  } = useContext(DistanciaContext);

  const km = kilometros.replace("km", "");
  const kmSinComa = parseFloat(km.replace(",", "."));

  const initialForm ={  // Aplico los valores iniciales de los input, de esta form idnico que son string basios
    remitente,
    direRemitente: Partida,
    destinatario,
    direDesino: Destino,
    kilometros,
    Precio:`$${shippingValue}`
    } 


    const { // destrucuto los valores de state y las functions 
      handleSumbit
          }= useForm(initialForm)

  useEffect(() => {
    if (kmSinComa > 2 && kmSinComa <= 3) {
      setShippingValue(shippingValue + 80);
    } else if (kmSinComa > 3 && kmSinComa <= 4) {
      setShippingValue(shippingValue + 160);
    } else if (kmSinComa > 4 && kmSinComa <= 5) {
      setShippingValue(shippingValue + 240);
    } else if (kmSinComa > 5 && kmSinComa <= 6) {
      setShippingValue(shippingValue + 320);
    } else if (kmSinComa > 6 && kmSinComa <= 7) {
      setShippingValue(shippingValue + 400);
    } else if (kmSinComa > 7 && kmSinComa <= 8) {
      setShippingValue(shippingValue + 480);
    } else if (kmSinComa > 8 && kmSinComa <= 9) {
      setShippingValue(shippingValue + 560);
    } else if (kmSinComa > 9 && kmSinComa <= 10) {
      setShippingValue(shippingValue + 640);
    } else if (kmSinComa > 10 && kmSinComa <= 11) {
      setShippingValue(shippingValue + 720);
    } else if (kmSinComa > 11 && kmSinComa <= 12) {
      setShippingValue(shippingValue + 800);
    } else if (kmSinComa > 12 && kmSinComa <= 13) {
      setShippingValue(shippingValue + 880);
    } else if (kmSinComa > 13 && kmSinComa <= 14) {
      setShippingValue(shippingValue + 960);
    } else if (kmSinComa > 14 && kmSinComa <= 15) {
      setShippingValue(shippingValue + 1040);
    }
  }, []);

  //console.log(shippingValue);

  const enviarMensajeWhatsApp = () => {
    const mensaje = `%0A Remitente: ${remitente}%0A
                        Dirección Partida: ${Partida}%0A
                        Destinatario: ${destinatario}%0A
                        Dirección Destino: ${Destino}%0A
                        Distancia: ${kilometros}%0A
                        Precio: ${shippingValue}`;
    const url = `https://api.whatsapp.com/send?phone=3516463416&text=${mensaje}`;

    window.open(url);
  };

  const handleClose = (e) => {
    setKilometros(null);
    setDestinationPosition(null)
  };

  return (
    <div className="container-Info-Pedido">
      <form onSubmit={handleSumbit}  >
        <button className="btn-X" onClick={handleClose}>
          X
        </button>
        <h2>
          Remitente: <span>{remitente}</span>
        </h2>
        <h2>
          Direccion Partida: <span>{Partida}</span>
        </h2>
        <hr />
        <h2>
          Destinatario: <span>{destinatario}</span>
        </h2>
        <h2>
          Direccion Destino: <span>{Destino}</span>
        </h2>
        <hr />
        <h2>
          Distancia: <span>{kilometros}</span>
        </h2>
        <h3>
          Precio: <span>$ {shippingValue}</span>
        </h3>
      <button onClick={enviarMensajeWhatsApp}>Enviar</button>
      </form>

      <br></br>
      <br></br>
      <br></br>
      <section>
        <p>
          Disfruta de envíos económicos de lunes a jueves, excepto en días
          feriados
        </p>
      </section>
    </div>
  );
}
