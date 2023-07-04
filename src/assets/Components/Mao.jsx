import React, { useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-map-react';

const MapContainer = ({ google }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState('');

  const handleGeocode = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        console.error('Error en la geocodificación:', status);
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese una dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleGeocode}>Convertir a coordenadas</button>

      {coordinates && (
        <Map
          google={google}
          style={{ width: '100%', height: '400px', marginTop: '20px' }}
          initialCenter={coordinates}
          center={coordinates}
        />
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDluxQk6wpbI55mP9vhmsTzxf2WwpmDJlI'
})(MapContainer);
