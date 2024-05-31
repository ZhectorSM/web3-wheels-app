import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMemo, useRef } from "react";

const Map = ({
  location1,
  onMarker1Change,
  location2 = null,
  onMarker2Change = null,
  firstLocationName
}) => {
  const customIcon1 = new Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/marker.png",
    iconSize: [40, 40]
  });

  const customIcon2 = new Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/marker.png",
    iconSize: [40, 40]
  });

  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);

  const eventHandlers1 = useMemo(
    () => ({
      dragend() {
        const marker1 = marker1Ref.current;
        if (marker1 != null) {
          const { lat, lng } = marker1.getLatLng();
          onMarker1Change([lat, lng]);
        }
      }
    }),
    [onMarker1Change]
  );

  const eventHandlers2 = useMemo(
    () => ({
      dragend() {
        const marker2 = marker2Ref.current;
        if (marker2 != null) {
          const { lat, lng } = marker2.getLatLng();
          if (onMarker2Change) {
            onMarker2Change([lat, lng]);
          }
        }
      }
    }),
    [onMarker2Change]
  );

  const bounds = [location1, location2].filter(Boolean);

  return (
    <MapContainer
      center={location1}
      zoom={15}
      className="hover:cursor-pointer"
      bounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        attribution="&copy; Map"
      />
      <MarkerClusterGroup chunkedLoading>
        {location1 && (
          <Marker
            draggable={true}
            eventHandlers={eventHandlers1}
            ref={marker1Ref}
            position={location1}
            icon={customIcon1}
          >
            <Popup minWidth={90}>
              <p className="font-bold text-gray-900 dark:text-gray-100">{`${firstLocationName} Location`}</p>
            </Popup>
          </Marker>
        )}
        {location2 && (
          <Marker
            draggable={true}
            eventHandlers={eventHandlers2}
            ref={marker2Ref}
            position={location2}
            icon={customIcon2}
          >
            <Popup minWidth={90}>
              <p className="font-bold text-gray-900 dark:text-gray-100">
                {"Destination"}
              </p>
            </Popup>
          </Marker>
        )}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
