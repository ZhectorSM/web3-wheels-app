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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const BookMap = dynamic(() => import("@/components/BookMap"), { ssr: false });

function BookRidePage() {
  const [pickupLocation, setPickupLocation] = useState([40.74005, -73.986562]);
  const [dropLocation, setDropLocation] = useState([40.74125, -73.980592]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [passengerId, setPassengerId] = useState(1);
  const [ridePayment, setRidePayment] = useState(0);

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

  const handlePickupLocationChange = (pickupLocation) => {
    setPickupLocation(pickupLocation);
  };

  const handleDropLocationChange = (dropLocation) => {
    setDropLocation(dropLocation);
  };

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sim/vehicles`
      );
      setVehicles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchVehicle();

  const bookRide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/sim/passengers`,
        {
          passengerId: passengerId,
          name: "John Doe",
          pickup: {
            position: {
              longitude: pickupLocation[1],
              latitude: pickupLocation[0]
            }
          },
          dropoff: {
            position: {
              longitude: dropLocation[1],
              latitude: dropLocation[0]
            }
          }
        }
      );
      console.log(response.data);

      setRidePayment(response.data.passenger.ridePrice);
      toast.success("Ride booked successfully!");
      setPassengerId(passengerId + 1);
    } catch (error) {
      console.error(error);
    }
  }

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
            {/* <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
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
          <Separator className="my-3 dark:bg-gray-700" />
          <ul className="grid gap-2">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground dark:text-gray-400">
                Estimated Price
              </span>
              <span>{ridePayment}{" "} $USDC</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground dark:text-gray-400">
                ETA
              </span>
              <span>25 minutes</span>
            </li>
          </ul>
          <Separator className="my-2 dark:bg-gray-700" />
          <ul className="grid gap-2">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground dark:text-gray-400">
                Total
              </span>
              <span>{ridePayment}{" "}$USDC</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="pb-6 dark:bg-gray-800">
          <Button
            className="w-full bg-zinc-900 text-gray-50 hover:bg-zinc-900/80 focus-visible:ring-zinc-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
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
        />
      </div>
    </Wrapper>
  );
}

export default BookRidePage;
