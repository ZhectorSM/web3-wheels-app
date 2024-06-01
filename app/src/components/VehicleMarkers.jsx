import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useMemo, useState, useEffect } from "react";

const VehicleMarkers = ({
  vehicles,
  rideBooked,
  nearestVehicle,
  pickupLocation,
  dropLocation
}) => {
  const carMarker = useMemo(
    () =>
      new Icon({
        iconUrl: "https://img.icons8.com/ios-filled/50/car.png",
        iconSize: [40, 40]
      }),
    []
  );

  const [movingVehicles, setMovingVehicles] = useState(vehicles);

  useEffect(() => {
    if (rideBooked && nearestVehicle) {
      const interval = setInterval(() => {
        setMovingVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) => {
            if (vehicle.vehicleId === nearestVehicle.vehicleId) {
              const latDiff = pickupLocation[0] - vehicle.position.latitude;
              const lngDiff = pickupLocation[1] - vehicle.position.longitude;
              const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
              const step = 0.0001;

              if (distance > step) {
                const newLat =
                  vehicle.position.latitude + (latDiff / distance) * step;
                const newLng =
                  vehicle.position.longitude + (lngDiff / distance) * step;
                return {
                  ...vehicle,
                  position: { latitude: newLat, longitude: newLng }
                };
              } else {
                // Vehicle has arrived at the pickup location
                return {
                  ...vehicle,
                  position: {
                    latitude: pickupLocation[0],
                    longitude: pickupLocation[1]
                  }
                };
              }
            }
            return vehicle;
          })
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rideBooked, nearestVehicle, pickupLocation]);

  return (
    <>
      {movingVehicles.map((vehicle) => (
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
