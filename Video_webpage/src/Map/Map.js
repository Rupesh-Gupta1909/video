import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const fullScreenStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1000,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const polylineOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const dummyData = {
  live: [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.7138, lng: -74.007 },
    { lat: 40.7148, lng: -74.008 },
  ],
  historical: [
    { lat: 34.0522, lng: -118.2437 },
    { lat: 34.0532, lng: -118.2447 },
    { lat: 34.0542, lng: -118.2457 },
  ],
};

const LocationMap = ({ selectedDate, isLive }) => {
  const [locations, setLocations] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fetchLocationData = useCallback(async () => {
    try {
      const response = await axios.get("API_ENDPOINT");
      setLocations(response.data.locations);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }, []);

  useEffect(() => {
    if (isLive) {
      setLocations(dummyData.live);
    } else {
      setLocations(dummyData.historical);
    }
    // Uncomment the following line to use actual API data
    // fetchLocationData();
  }, [selectedDate, isLive, fetchLocationData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  const onLoad = useCallback((mapInstance) => {
    // Perform additional actions once the map is fully loaded
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: isFullScreen ? "auto" : "10px",
          right: "10px",
          bottom: isFullScreen ? "10px" : "auto",
          zIndex: "1001",
          cursor: "pointer",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "5px",
          padding: "5px",
        }}
        onClick={toggleFullScreen}
      >
        <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} size="lg" />
      </div>
      <div style={isFullScreen ? fullScreenStyle : containerStyle}>
        <LoadScript
          googleMapsApiKey="AIzaSyCxRH3kXnRUM35n4VD-sWYHqIFaAQvplDQ"
          loadingElement={<div>Loading...</div>}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={locations.length ? locations[0] : { lat: 0, lng: 0 }}
            zoom={10}
            options={mapOptions}
            onLoad={onLoad}
            
          >
            {locations.length > 1 && (
              <Polyline path={locations} options={polylineOptions} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationMap;
