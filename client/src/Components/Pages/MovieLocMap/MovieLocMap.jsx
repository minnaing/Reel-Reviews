import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

import "./MovieLocMap.css";

const libraries = ["places"];

const containerStyle = {
  width: "800px",
  height: "400px",
};

const defaultCenter = { lat: -3.745, lng: -38.523 };

const MovieLocMap = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [inputAddress, setInputAddress] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "reel-reviews-info",
    googleMapsApiKey: "AIzaSyBbO3mBbGJltG9Znw0iZzll4vMEclyGCCo",
    libraries,
  });

  const determineLabel = (place) => {
    // Check if the place has a name and use it as the primary label regardless of the type
    if (place.name) {
      return place.name;
    }

    // Fallback based on types if no name is provided
    if (!place.types) {
      return "Unknown Place"; // Fallback if no types are available
    }

    if (place.types.includes("movie_theater")) {
      return "Movie Theater"; // Specific label for movie theaters
    } else if (place.types.includes("store")) {
      return "Store"; // Specific label for stores, even if no name is given
    } else {
      return "General Location"; // Default label for other types
    }
  };

  const addMarkerWithAddress = useCallback(
    (place) => {
      if (!place || !place.geometry || !place.geometry.location) {
        console.error(`Invalid place data received ${place}`);
        return;
      }

      const location = place.geometry.location;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address; // Get the formatted address
          const label = determineLabel(place);

          setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              position: location,
              address: address,
              label: {
                text: label,
                color: "black", // Set text color
                fontSize: "12px", // Set text size
                fontWeight: "bold", // Make it bold
              },
            },
          ]);
        } else {
          console.error(`Geocoding failed: ${status}`);
        }
      });
    },
    [setMarkers]
  );

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onLoadSearchBox = useCallback((ref) => {
    console.log("SearchBox onLoad called", ref);
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox && searchBox.getPlaces()) {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        console.error("No places found");
        return;
      }

      // Clear existing markers before setting new ones
      setMarkers([]);

      const bounds = new window.google.maps.LatLngBounds();
      let newPhotos = [];

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.error("Place has no geometry", place);
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        if (place.photos && place.photos.length) {
          newPhotos.push(place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 }));
        }

        addMarkerWithAddress(place);
      });

      setPhotos(newPhotos); // Update state with new photos
      map.fitBounds(bounds);
    }
  }, [addMarkerWithAddress, map, searchBox, setPhotos]);

  useEffect(() => {
    console.log("SearchBox Loaded:", searchBox !== null);
  }, [searchBox]);

  useEffect(() => {
    console.log("Current markers count:", markers.length);
  }, [markers]);

  useEffect(() => {
    console.log("Map Loaded: ", isLoaded);
    console.log("Current Center: ", center);

    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const mockPlace = {
            geometry: {
              location: pos,
            },
            types: ["point_of_interest"], // Assuming default types
            name: "Current Location",
          };
          setCenter(pos);
          addMarkerWithAddress(mockPlace);

          // addMarkerWithAddress(pos); // Set marker at user's location with address
        },
        (error) => {
          console.error(`Geolocation failed ${error.message}`);
        }
      );
    }
  }, [isLoaded, addMarkerWithAddress]); // Ensure isLoaded and addMarkerWithAddress are included as dependencies

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <div id="movie_location">
      <StandaloneSearchBox id="searchBox" onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
        <input
          id="search_location"
          type="text"
          placeholder="Search for the nearest movie theater"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </StandaloneSearchBox>
      <GoogleMap id="map-container" center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} onClick={() => setSelectedMarker(marker)} />
        ))}
        {selectedMarker && (
          <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <h2>{selectedMarker.label.text}</h2>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div id="location-photos">
        {photos.length > 0 ? (
          photos.map((photoUrl, index) => (
            <img key={index} src={photoUrl} alt="Location" style={{ width: "100px", height: "100px" }} />
          ))
        ) : (
          <p id="non-displayed">Amazing photos will be displayed once search is executed.</p>
        )}
      </div>
    </div>
  ) : null;
};

export default React.memo(MovieLocMap);