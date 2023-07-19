import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';


const DistanciaContext = createContext();


const Distancia = ({ children }) => {
  const [kilometros, setKilometros] = useState(null);
  const [Partida, setPartida] = useState(null);
  const [Destino, setDestino] = useState(null);
  const [shippingValue, setShippingValue] = useState(350);

  const [destinationPosition, setDestinationPosition] = useState(null);


  const [remitente, setRemitente] = useState(null);
  const [destinatario, setDestinatario] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    
    if (currentDay === 0 || currentDay === 5 || currentDay === 6) {
      setShippingValue(400);
    } else {
      setShippingValue(350);
    }
  }, []);
  
  
  const socket = io('http://127.0.0.1:5173');


/*   useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Enviar la ubicación actual al servidor
        socket.emit('updateLocation', { latitude, longitude });
        console.log(latitude,longitude);
      },
      (error) => {
        console.error(error);
      }
    );

    // Limpiar el watchId cuando el componente se desmonte
    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.disconnect();
    };
  }, []); */
  

  const data = {
    kilometros,
    setKilometros,
    Partida,
    setPartida,
    Destino,
    setDestino,
    shippingValue,
    setShippingValue,
    remitente,
    setRemitente,
    destinatario,
    setDestinatario,
    destinationPosition,
    setDestinationPosition
  };

  return (
    <DistanciaContext.Provider value={data}>
      {children}
    </DistanciaContext.Provider>
  );
};

export { Distancia };
export default DistanciaContext;
