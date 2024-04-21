import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

import './MovieLocMap.css';

const libraries = ["places"];

const containerStyle = {
  width: "800px",
  height: "400px",
};

const defaultCenter = { lat: -3.745, lng: -38.523 };

const MovieLocMap = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [inputAddress, setInputAddress] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'reel-reviews-info',
    googleMapsApiKey: 'AIzaSyBbO3mBbGJltG9Znw0iZzll4vMEclyGCCo',
    libraries,
  });

  const addMarkerWithAddress = useCallback(
    (location) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address; // Get the formatted address
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              position: location,
              address: address,
              label: {
                // Setup label object
                text: address, // Use the address as the label text
                color: 'black', // Set text color
                fontSize: '12px', // Set text size
                fontWeight: 'bold', // Make it bold
              },
            },
          ]);
        } else {
          console.error('Geocoding failed: ' + status);
        }
      });
    },
    [setMarkers]
  );

  const onLoad = useCallback(function callback (map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback () {
    setMap(null);
  }, []);

  const onLoadSearchBox = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox && searchBox.getPlaces()) {
      const places = searchBox.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();
      let newPhotos = [];

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        if (place.photos && place.photos.length) {
          newPhotos.push(place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 }));
        }

        addMarkerWithAddress(place.geometry.location); // Add marker for searched places
      });

      setPhotos(newPhotos); // Update state with new photos
      map.fitBounds(bounds);
    }
  }, [searchBox, map, addMarkerWithAddress, setPhotos]);

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          addMarkerWithAddress(pos); // Set marker at user's location with address
        },
        () => {
          console.error('Geolocation failed or permission denied');
        }
      );
    }
  }, [isLoaded, addMarkerWithAddress]); // Ensure isLoaded and addMarkerWithAddress are included as dependencies

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <div id="movie_location">
      <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
        <input
          id="search_location"
          type="text"
          placeholder="Search for the nearest movie theater"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </StandaloneSearchBox>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} onClick={() => setSelectedMarker(marker)} />
        ))}
        {selectedMarker && (
          <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <h2>{inputAddress}</h2>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div id="location-photos">
        {photos.map((photoUrl, index) => (
          <img key={index} src={photoUrl} alt="Location" style={{ width: "100px", height: "100px" }} />
        ))}
      </div>
    </div>
  ) : null;
};

export default React.memo(MovieLocMap);
