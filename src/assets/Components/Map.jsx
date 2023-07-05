import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';



const center = {
  lat: -31.431468,
  lng: -64.229144,
};

const restrictionBounds = {
  north: -31.416925,
  south: -31.446925,
  west: -64.252429,
  east: -64.222429
};

const Map = () => {
  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);
  const originAddressRef = useRef(null);
  const destinationAddressRef = useRef(null);

  const [km, setKm] = useState(null);

  const [directions, setDirections] = useState(null);
  const [showDirections, setShowDirections] = useState(false);




  const containerStyle = {
    width: "850px",
    height: '600px'
  };
  
  const stylseMobile={
    with:"390px",
    height:"700px",
  }

  



  const handleOriginSubmit = (e) => {
    e.preventDefault();
    const address = originAddressRef.current.value;
    geocodeAddress(address, setOriginPosition);
  };



  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    const address = destinationAddressRef.current.value;
    geocodeAddress(address, setDestinationPosition);
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
            console.log('Distancia:', distance);
            setKm(distance)
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

    <div className='container-map'>
        <LoadScript googleMapsApiKey="AIzaSyA4tI6GkKv6UL1JEDoJmsN8tzMWnETppKo">
      <GoogleMap
        mapContainerStyle={ window.innerWidth <800 ? stylseMobile : containerStyle}
        center={center}
        zoom={13}
        options={{
          restriction: {
            latLngBounds: restrictionBounds,
            strictBounds: false
          }
        }}
      >
        {originPosition && <Marker position={originPosition} />}
        {destinationPosition && <Marker position={destinationPosition} />}
        {showDirections && renderDirections()}
      </GoogleMap>
      
      <div className="map1">
        
        <form onSubmit={handleOriginSubmit}>
        <input type="text" placeholder="Ingrese la dirección de partida" ref={originAddressRef} />
        <button type="submit">Mostrar en el mapa</button>
      </form>
      <form onSubmit={handleDestinationSubmit}>
        <input type="text" placeholder="Ingrese la dirección de destino" ref={destinationAddressRef} />
        <button type="submit">Mostrar dirección</button>
      </form>
      <button onClick={calculateDistance} disabled={!originPosition || !destinationPosition}>
        Calcular distancia 
      </button>
      <p>{km}</p>
        
        </div>
    
    </LoadScript>
  
    </div>

  );
};

export default Map;


