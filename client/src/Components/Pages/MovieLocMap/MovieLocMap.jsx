import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ["places"];

const containerStyle = {
  width: '800px',
  height: '400px',
};

const center = { lat: -3.745, lng: -38.523 };

function MyComponent() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchBox, setSearchBox] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'reel-reviews-info',
    googleMapsApiKey: "AIzaSyBbO3mBbGJltG9Znw0iZzll4vMEclyGCCo",
    libraries: libraries
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onLoadSearchBox = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox && searchBox.getPlaces) {
      const places = searchBox.getPlaces();
      if (places.length) {
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) return;
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
        setMarkers(places.map(place => ({
          position: place.geometry.location,
        })));
      }
    }
  }, [searchBox, map]); // Correctly use dependencies here

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <div >
      <StandaloneSearchBox
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for the nearest movie theater"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '320px',
            height: '32px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
            position: 'absolute',
            left: '75%',
            marginLeft: '-120px'
          }}
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(MyComponent);
