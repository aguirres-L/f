import React, { useState, useRef, useEffect ,useContext} from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import card from "../img/card.png"
import bike from "../img/bike.png"
import "./Map.css"

import icono from "../img/2.png"
import icono1 from "../img/3.png"

import DistanciaContext from './Context/Distancia/Distancias';
import InfoPedido from './InfoPedido/InfoPedido';

const center = {
  lat: -31.431468,
  lng: -64.229144,
};



const Map = () => {
  const [originPosition, setOriginPosition] = useState(null);
  
  const originAddressRef = useRef(null);
  const destinationAddressRef = useRef(null);
  
 // console.log(originAddressRef);
  
  const remitenteRef = useRef(null);
  const destinatarioRef = useRef(null);
  
  

    const {kilometros,setKilometros,setPartida,setDestino, setRemitente, setDestinatario,socket,latitude,
      longitude,destinationPosition, setDestinationPosition} = useContext(DistanciaContext)
  
  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [repMarkers, setRepMarkers] = useState([]);

  const containerStyle = {
    width: "850px",
    height: '500px',
  };
  
  const stylseMobile = {
    width: "100%",
    height: "400px",
  };
  
  //console.log(latitude,longitude,"ver");
  
 // console.log(socket);


  const handleOriginSubmit = (e) => {
    e.preventDefault();
    const address = `${originAddressRef.current.value},Cordoba`;
    geocodeAddress(address, setOriginPosition);
    setPartida(address)
    const remitente = remitenteRef.current.value;
    setRemitente(remitente)
  };

  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    const address = `${destinationAddressRef.current.value},Cordoba`;
    geocodeAddress(address, setDestinationPosition); /// talvez su hago una x puedo cerrar el contenido del mensaje 
    setDestino(address)
    const destinatario = destinatarioRef.current.value;
    setDestinatario(destinatario)
  };

  const geocodeAddress = (address, setPosition) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        setPosition({
          lat: location.lat(),
          lng: location.lng()
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const calculateDistance = () => {
    if (originPosition && destinationPosition) {
      const origin = new window.google.maps.LatLng(originPosition.lat, originPosition.lng);
      const destination = new window.google.maps.LatLng(destinationPosition.lat, destinationPosition.lng);
      const service = new window.google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING'
        },
        (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
        //    console.log('Distancia:', distance);
    //        setKm(distance)
            setKilometros(distance)
            getDirections();
          } else {
            console.error('Error al calcular la distancia:', status);
          }
        }
      );
    }
  };

  const getDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = new window.google.maps.LatLng(originPosition.lat, originPosition.lng);
    const destination = new window.google.maps.LatLng(destinationPosition.lat, destinationPosition.lng);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
          setShowDirections(true);
        } else {
          console.error('Error al obtener las direcciones:', status);
        }
      }
    );
  };

  useEffect(() => {
    // Simulación de cambio en la disponibilidad de los repartidores
    const interval = setInterval(() => {
      // Aquí debes obtener la información actualizada de la disponibilidad de los repartidores
      const repartidoresDisponibles = obtenerRepartidoresDisponibles();

      // Generar los marcadores de los repartidores disponibles
      const markers = repartidoresDisponibles.map(repartidor => ({
        position: { lat: repartidor.latitud, lng: repartidor.longitud },
        icon: repartidor.tipo === 'auto' ? card : bike
      }));

      setRepMarkers(markers);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const obtenerRepartidoresDisponibles = () => {
    // Aquí debes obtener la información actualizada de los repartidores disponibles desde tu backend o alguna fuente de datos
    // Retorna una lista de objetos con la latitud, longitud y tipo de los repartidores disponibles
    // Por ejemplo:
    return [
      { latitud: -31.431468, longitud: -64.229144, tipo: 'auto' },
      { latitud: -31.416925, longitud: -64.222429, tipo: 'moto' },
    ];
  };

  const renderMarkers = () => {
    return repMarkers.map((marker, index) => (
      <Marker
        key={index} 
        position={marker.position} 
        icon={{
        url: marker.icon,
        scaledSize: new window.google.maps.Size(22, 22), // Tamaño personalizado del ícono (32x32 píxeles)
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 16), // Punto de anclaje del ícono (centro del ícono)
      }} />
    ));
  };

  const renderDirections = () => {
    return (
      directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            preserveViewport: true
          }}
        />
      )
    );
  };




  return (
    <div className="container-superior">
    <a href="https://api.whatsapp.com/send?phone=3516463416&text=Hola.. Me podrian dar mas informacion?"><img className='logo' src={icono} alt="" /></a>
    
    <div className='container-map'>
      <LoadScript googleMapsApiKey="AIzaSyA4tI6GkKv6UL1JEDoJmsN8tzMWnETppKo">
        <GoogleMap
          mapContainerStyle={window.innerWidth < 800 ? stylseMobile : containerStyle}
          center={center}
          zoom={13}
          /* options={{
            restriction: {
              latLngBounds: restrictionBounds,
              strictBounds: false
            }
          }} */
        >
          {originPosition && <Marker position={originPosition} />}
          {destinationPosition && <Marker position={destinationPosition} />}
          {renderMarkers()}
          {showDirections && renderDirections()}
        </GoogleMap>
        <div className="map1">
          
          <form   className={!destinationPosition ?'my-form':"btn-null"} onSubmit={handleOriginSubmit}>
        
          <input type="text" placeholder="Nombre del local o remitente" ref={remitenteRef} /> {/* Nuevo input */}
            <br/>
            <br/>
            <input type="text" placeholder="Dirección " ref={originAddressRef} />
            <button className='btn-Submit' type="submit">Mostrar punto de partida</button>
          </form>
          
          <form  className={!destinationPosition ?'my-form':"btn-null"} onSubmit={handleDestinationSubmit}>
          <input type="text" placeholder="Nombre del destinatario" ref={destinatarioRef} /> {/* Nuevo input */}
          <br/>
            <br/>
            <input type="text" placeholder="Dirección" ref={destinationAddressRef} />
            <button className='btn-Submit' type="submit">Mostrar punto de destino</button>
          </form>
          <button className={destinationPosition ?'btn-calculo':"btn-null"}  onClick={calculateDistance} disabled={!originPosition || !destinationPosition}>
        <span>C</span>
        <span>A</span>
        <span>L</span>
        <span>C</span>
        <span>U</span>
        <span>L</span>
        <span>A</span>
        <span>R</span>
          </button>
        </div>
        </LoadScript>
        
    </div>
    {kilometros
    &&<InfoPedido remitenteRef={remitenteRef} />
    }
    
    </div>
  );
};

export default Map;




      //  <LoadScript googleMapsApiKey="AIzaSyA4tI6GkKv6UL1JEDoJmsN8tzMWnETppKo">