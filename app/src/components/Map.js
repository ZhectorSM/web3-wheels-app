import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo, useRef } from "react";

const Map = ({location, onMarkerChange}) => {

    const customIcon = new Icon({
        iconUrl: "https://img.icons8.com/ios-filled/50/marker.png",
        iconSize: [40, 40],
    });

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                console.log(marker.getLatLng());
                const { lat, lng } = marker.getLatLng();
                onMarkerChange([lat, lng]); 
            }
        }
        }),
        []
    );

  return (
    <MapContainer
      center={location}
      zoom={15}
      className="hover:cursor-pointer"
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png" // map api
        attribution="&copy; Map"
      />
      <MarkerClusterGroup chunkedLoading>
        {location && (
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={location}
            icon={customIcon}
          >
            <Popup minWidth={90}>
              <p className="font-bold">
                {"Garage Location"}
              </p>
            </Popup>
          </Marker>
        )}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
