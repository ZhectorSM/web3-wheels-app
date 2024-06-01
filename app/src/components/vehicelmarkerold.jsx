import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useMemo } from "react";

const VehicleMarkers = ({ vehicles }) => {
  const carMarker = useMemo(
    () =>
      new Icon({
        iconUrl: "https://img.icons8.com/ios-filled/50/car.png",
        iconSize: [40, 40]
      }),
    []
  );

  return (
    <>
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.vehicleId}
          position={[vehicle.position.latitude, vehicle.position.longitude]}
          icon={carMarker}
        >
          <Popup minWidth={90}>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {vehicle.name}
            </p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default VehicleMarkers;
