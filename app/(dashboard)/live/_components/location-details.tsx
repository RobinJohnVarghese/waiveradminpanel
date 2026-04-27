"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import useSocket from "@/hooks/socket/use-socket";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 150px)",
};

export default function LocationDetails({ session }: { session: any }) {
  const { users, center }: any = useSocket(session);
  const [zoom, setZoom] = useState(6);
  const [hoverLocation, setHoverLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<any>(null);

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = zoom + 1;
      setZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = zoom - 1;
      setZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const handleMapMouseMove = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setHoverLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  const userTypeColors: Record<string, string> = {
    DVR: "#ff3b30", // DRIVER = red
    CHR: "#007bff", // CHAUFFEUR = blue
    CTR: "#28a745", // CUSTOMER = green
    FTR: "#ffc107", // FLEET_OWNER = yellow
    INR: "#888888", // INTERNAL_USER = gray
    driver: "#ff3b30",
    DRIVER: "#ff3b30",
    chauffeur: "#007bff",
    CHAUFFEUR: "#007bff",
    customer: "#28a745",
    CUSTOMER: "#28a745",
    fleet_owner: "#ffc107",
    FLEET_OWNER: "#ffc107",
    internal_user: "#888888",
    INTERNAL_USER: "#888888",
    default: "#888888",
  };

  function getMarkerIcon(userType: string = ""): google.maps.Icon | undefined {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      let rawColor =
        userTypeColors[userType] ||
        userTypeColors[(userType || "").replace(/\s+/g, "_").toUpperCase()] ||
        userTypeColors[userType.toLowerCase()] ||
        userTypeColors.default;

      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
    <path d="M16 0C8 0 0 6 0 16c0 10.7 16 32 16 32s16-21.3 16-32C32 6 24 0 16 0z" fill="${rawColor}"/>
    <circle cx="16" cy="16" r="7" fill="white"/>
</svg>`;

      return {
        url: "data:image/svg+xml;utf-8," + encodeURIComponent(svg),
        scaledSize: new window.google.maps.Size(32, 48),
        anchor: new window.google.maps.Point(16, 48),
      };
    }
    return undefined;
  }

  const [_center, setCenter] = useState(center);

  const [activeMarker, setActiveMarker] = useState<string | number | null>(
    null
  );

  const handleMouseOver = (markerId: any) => {
    console.log({ markerId });

    if (activeMarker !== markerId) {
      console.log(
        "active marker : ",
        activeMarker,
        "marker curent : ",
        markerId
      );
      setActiveMarker(markerId.id);
    }
  };

  const handleMouseOut = () => {
    setActiveMarker(null);
  };

  return (
    <div className="relative bg-white h-full p-4">
      <h2 className="text-md mb-4">Active users</h2>
      <div className="mb-24">
        <LoadScript
          googleMapsApiKey={"AIzaSyCLEfEp-SLiapNoQ9waRFFDFun4g-HawU8"}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={_center}
            zoom={zoom}
            onLoad={(map: any) => (mapRef.current = map)}
            onMouseMove={handleMapMouseMove}
          >
            {users?.map((user: any, index: number) => (
              <React.Fragment key={users.id}>
                {/* <Marker
            position={marker.position}
            onMouseOver={() => handleMouseOver(marker.id)}
            onMouseOut={handleMouseOut}
            // Remove the title prop to avoid native tooltip
            /> */}
                <Marker
                  key={user.id + index}
                  position={user.location}
                  onMouseOver={() => handleMouseOver(user)}
                  onMouseOut={handleMouseOut}
                  icon={getMarkerIcon(user.user_type)}
                />
                {activeMarker === user.id && (
                  <InfoWindow position={user.location}>
                    <div
                      style={{
                        padding: "1px 4px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {user.name}
                      <div
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {user.user_phone}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </React.Fragment>
            ))}
            {/* {hoverLocation && (
                            <Marker
                                position={hoverLocation}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: 'blue',
                                    fillOpacity: 0.6,
                                    strokeWeight: 2,
                                    strokeColor: 'white',
                                }}
                                clickable={false}
                                draggable={false}
                            />
                        )} */}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="absolute top-4 right-4 space-x-2">
        <button
          className="bg-blue-500 text-white p-2 mb-2 rounded text-xs"
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded text-xs"
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
}
