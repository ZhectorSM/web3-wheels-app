"use client";
import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

const BookMap = dynamic(() => import("@/components/BookMap"), { ssr: false });

const mockVehicles = [
  {
    vehicleId: 1,
    name: "Thezla",
    vin: "LM4AC113061105688",
    reputation: 7,
    revenue: 524,
    mileage_km: 60000,
    expenses: 350,
    position: { latitude: 40.7391, longitude: -73.9905 }
  },
  {
    vehicleId: 2,
    name: "BeMeWe",
    vin: "WAUKEAFM8DA033285",
    mileage_km: 111000,
    expenses: 135,
    reputation: 8,
    revenue: 358,
    position: { latitude: 40.7457, longitude: -73.9985 }
  },
  {
    vehicleId: 3,
    name: "Knight Rider",
    vin: "KITT19820KS005705",
    mileage_km: 25000,
    reputation: 9,
    expenses: 120,
    revenue: 200,
    position: { latitude: 40.7503, longitude: -73.9835 }
  },
  {
    vehicleId: 4,
    name: "Mircidis",
    vin: "LM4AC113061sdas105688",
    mileage_km: 6009,
    reputation: 8,
    expenses: 40,
    revenue: 109,
    position: { latitude: 40.7321, longitude: -73.9735 }
  }
];

function BookRidePage() {
  const [pickupLocation, setPickupLocation] = useState([40.74005, -73.986562]);
  const [dropLocation, setDropLocation] = useState([40.74125, -73.980592]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [passengerId, setPassengerId] = useState(1);
  const [ridePayment, setRidePayment] = useState(0);
  const [eta, setEta] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rideBooked, setRideBooked] = useState(false);
  const [nearestVehicle, setNearestVehicle] = useState(null);

  const date = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", ",");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pick = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${pickupLocation[0]}&lon=${pickupLocation[1]}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
        );
        setPickupAddress(pick.data.features[0].properties.formatted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pickupLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drop = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${dropLocation[0]}&lon=${dropLocation[1]}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
        );
        setDropAddress(drop.data.features[0].properties.formatted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dropLocation]);

  useEffect(() => {
    setVehicles(mockVehicles);
  }, []);

  const handlePickupLocationChange = (pickupLocation) => {
    setPickupLocation(pickupLocation);
  };

  const handleDropLocationChange = (dropLocation) => {
    setDropLocation(dropLocation);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon1 - lon2) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestVehicle = () => {
    let nearest = null;
    let minDistance = Infinity;

    vehicles.forEach((vehicle) => {
      const distance = getDistance(
        vehicle.position.latitude,
        vehicle.position.longitude,
        pickupLocation[0],
        pickupLocation[1]
      );
      if (distance < minDistance) {
        nearest = vehicle;
        minDistance = distance;
      }
    });

    return nearest;
  };

  const bookRide = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nearestVehicle = findNearestVehicle();

    setTimeout(() => {
      setRidePayment(Math.floor(Math.random() * 50) + 3);
      setEta(Math.floor(Math.random() * 15) + 3);
      toast.success("Ride booked successfully!");
      setPassengerId(passengerId + 1);
      setLoading(false);
      setRideBooked(true);
      setNearestVehicle(nearestVehicle);
    }, 2000);
  };


  return (
    <Wrapper className="grid grid-cols-7 justify-center gap-6 p-10 px-28 dark:bg-gray-900">
      <Card className="overflow-hidden col-span-3 h-fit dark:bg-gray-800 dark:text-gray-100">
        <CardHeader className="flex flex-row pb-3 items-start bg-muted/50 dark:bg-gray-700">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg dark:text-gray-100">
              Book a Web3 wheel
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              Date: {formattedDate}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button className="h-8 gap-1" size="sm" variant="outline">
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap dark:text-gray-100">
                Passenger: {passengerId}
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-5 text-sm dark:text-gray-300">
          <div className="grid gap-4">
            <div className="font-semibold text-base dark:text-gray-100">
              Ride Details
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-3">
                <div className="font-semibold text-zinc-800 underline underline-offset-1 dark:text-gray-100">
                  Pickup Information
                </div>
                <div>
                  <span className="grid gap-0.5 not-italic text-muted-foreground dark:text-gray-400">
                    Latitude: {pickupLocation[0]}
                  </span>
                  <span className="grid gap-0.5 not-italic text-muted-foreground mb-1 dark:text-gray-400">
                    Longitude: {pickupLocation[1]}
                  </span>
                  <address className="grid gap-0.5 not-italic text-muted-foreground dark:text-gray-400">
                    <span>{pickupAddress}</span>
                  </address>
                </div>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold text-zinc-800 underline underline-offset-1 dark:text-gray-100">
                  Drop-off Information
                </div>
                <div>
                  <span className="grid gap-0.5 not-italic text-muted-foreground dark:text-gray-400">
                    Latitude: {dropLocation[0]}
                  </span>
                  <span className="grid gap-0.5 not-italic text-muted-foreground mb-1 dark:text-gray-400">
                    Longitude: {dropLocation[1]}
                  </span>
                  <address className="grid gap-0.5 not-italic text-muted-foreground dark:text-gray-400">
                    <span>{dropAddress}</span>
                  </address>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-3" />
          <ul className="grid gap-2 text-sm text-muted-foreground dark:text-gray-400">
            <li className="flex items-center justify-between">
              <span className="col-span-1">ETA</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {loading ? "Calculating..." : `${eta} mins`}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="col-span-1">Ride Price</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {loading ? "Calculating..." : `${ridePayment} $USD`}
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="pb-6 dark:bg-gray-800">
          <Button
            className="w-full bg-zinc-900 text-gray-50 hover:bg-zinc-900/80 focus-visible:ring-zinc-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 transition duration-75 active:bg-black active:translate-x-0.5 active:translate-y-0.5"
            onClick={(e) => bookRide(e)}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
      <div className="p-3 h-[560px] col-span-4 w-[800px] border-zinc-300 border rounded-md dark:border-gray-700">
        <BookMap
          location1={pickupLocation}
          location2={dropLocation}
          onMarker1Change={handlePickupLocationChange}
          onMarker2Change={handleDropLocationChange}
          firstLocationName={"Pick up"}
          vehicles={vehicles}
          rideBooked={rideBooked}
          nearestVehicle={nearestVehicle}
        />
      </div>
    </Wrapper>
  );
}

export default BookRidePage;
