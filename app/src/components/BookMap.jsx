import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useMemo, useRef, useEffect } from "react";
import VehicleMarkers from "./VehicleMarkers";

const BookMap = ({
  location1,
  onMarker1Change,
  location2,
  onMarker2Change,
  firstLocationName,
  vehicles = [],
  rideBooked,
  nearestVehicle
}) => {
  const pinMarker = useMemo(
    () =>
      new Icon({
        iconUrl: "https://img.icons8.com/ios-filled/50/marker.png",
        iconSize: [40, 40]
      }),
    []
  );

  const pickRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    console.log("Pickup marker ref assigned:", pickRef.current);
    console.log("Dropoff marker ref assigned:", dropRef.current);
  }, [pickRef.current, dropRef.current]);

  const eventHandlers1 = useMemo(
    () => ({
      dragend() {
        const marker1 = pickRef.current;
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
        const marker2 = dropRef.current;
        if (marker2 != null) {
          const { lat, lng } = marker2.getLatLng();
          onMarker2Change([lat, lng]);
        }
      }
    }),
    [onMarker2Change]
  );

  const bounds = useMemo(
    () => [location1, location2].filter(Boolean),
    [location1, location2]
  );

  return (
    <MapContainer
      center={location1}
      zoom={15}
      className="hover:cursor-pointer"
      bounds={bounds}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        attribution="&copy; Map"
      />

      {location1 && (
        <Marker
          draggable={true}
          eventHandlers={eventHandlers1}
          ref={pickRef}
          position={location1}
          icon={pinMarker}
        >
          <Popup minWidth={90}>
            <p className="font-bold text-gray-900 dark:text-gray-100">{`${firstLocationName}`}</p>
          </Popup>
        </Marker>
      )}
      {location2 && (
        <Marker
          draggable={true}
          eventHandlers={eventHandlers2}
          ref={dropRef}
          position={location2}
          icon={pinMarker}
        >
          <Popup minWidth={90}>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {"Destination"}
            </p>
          </Popup>
        </Marker>
      )}
      <VehicleMarkers
        vehicles={vehicles}
        rideBooked={rideBooked}
        nearestVehicle={nearestVehicle}
        pickupLocation={location1}
        dropLocation={location2}
      />
    </MapContainer>
  );
};

export default BookMap;
