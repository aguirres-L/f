


import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -31.4315,
  lng: -64.2303
};

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
    /*   if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng()
        });

        // Aquí puedes utilizar el valor de 'location' para realizar la lógica que necesites

      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      } */
      
      console.log(status);
    });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA4tI6GkKv6UL1JEDoJmsN8tzMWnETppKo">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      <form onSubmit={handleAddressSubmit}>
        <input
          type="text"
          id="res"
          placeholder="Enter address"
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit">Add Marker</button>
      </form>
    </LoadScript>
  );
};

export default Map;




/*  import React, { useState, useRef } from 'react';



import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer, } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -31.4315,
  lng: -64.2303
};

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const addressRef = useRef(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const [ubi, setUbi] = useState("");

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    const address = addressRef.current.value;
   geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng()
        });

        const origin = new window.google.maps.LatLng(location.lat(), location.lng());
        const destination = new window.google.maps.LatLng(center.lat, center.lng);
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirectionsResponse(response);
            } else {
              console.error('Error calculating directions:', status);
            }
          }
        );
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  
    console.log(address);
  };

 return (
    <LoadScript googleMapsApiKey="AIzaSyDluxQk6wpbI55mP9vhmsTzxf2WwpmDJlI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker position={center}  />
         <DirectionsRenderer directions={directionsResponse} />
      </GoogleMap>
      <form onSubmit={handleAddressSubmit}>
        <input type="text" placeholder="Enter address"/>
        <button type="submit">Add Marker</button>
      </form>
    </LoadScript>
  );
};

export default Map;
*/