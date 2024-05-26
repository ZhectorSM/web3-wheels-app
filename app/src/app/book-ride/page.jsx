"use client";
import { useEffect, useState }from 'react';
import Wrapper from "@/components/Wrapper";
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from 'axios';

function BookRidePage() {

    const [pickupLocation, setPickupLocation] = useState([40.74005, -73.986562]);
    const [dropLocation, setDropLocation] = useState([40.74125, -73.980592]);
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropAddress, setDropAddress] = useState("");

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

    const handleClick = async (e) => {
      e.preventDefault();

      const findingCarAndAssigningItToPickYouUp = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      const response = await toast.promise(
        findingCarAndAssigningItToPickYouUp,
        {
          pending: {
            render: "Finding Car... 🚗",
            position: "bottom-right",
            theme: "dark",
            className: "text-md font-medium"
          },
          success: {
            render: "Car X is coming to  pick you up 🚘",
            position: "bottom-right",
            theme: "dark",
            className: "text-md font-medium"
          },
          error: "Oops! looks like all cars are busy 😢"
        }
      );
      console.log(response);
    };

    return (
      <Wrapper className="grid grid-cols-7 justify-center gap-6 p-10 px-28">
        <Card className="overflow-hidden col-span-3 h-fit">
          <CardHeader className="flex flex-row pb-3 items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Book a Web3 wheel
              </CardTitle>
              <CardDescription>Date: {formattedDate}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button className="h-8 gap-1" size="sm" variant="outline">
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Refresh
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-5 text-sm">
            <div className="grid gap-4">
              <div className="font-semibold text-base">Ride Details</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-3">
                  <div className="font-semibold text-zinc-800 underline underline-offset-1">
                    Pickup Information
                  </div>
                  <div>
                    <span className="grid gap-0.5 not-italic text-muted-foreground">
                      Latitude: {pickupLocation[0]}
                    </span>
                    <span className="grid gap-0.5 not-italic text-muted-foreground mb-1">
                      Longitude: {pickupLocation[1]}
                    </span>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{pickupAddress}</span>
                    </address>
                  </div>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold text-zinc-800 underline underline-offset-1">
                    Drop-off Information
                  </div>
                  <div>
                    <span className="grid gap-0.5 not-italic text-muted-foreground">
                      Latitude: {dropLocation[0]}
                    </span>
                    <span className="grid gap-0.5 not-italic text-muted-foreground mb-1">
                      Longitude: {dropLocation[1]}
                    </span>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{dropAddress}</span>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-3" />
            <ul className="grid gap-2">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated Price</span>
                <span>45.00 $USDC</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">ETA</span>
                <span>25 minutes</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-2">
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>45.00 $USDC</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pb-6">
            <Button
              className="w-full bg-zinc-900 text-gray-50 hover:bg-zinc-900/80 focus-visible:ring-zinc-900"
              onClick={handleClick}
            >
              Book Now
            </Button>
          </CardFooter>
        </Card>
        <div className="p-3 h-[560px] col-span-4 w-[800px] border-zinc-300 border rounded-md">
          <Map
            location1={pickupLocation}
            location2={dropLocation}
            onMarker1Change={handlePickupLocationChange}
            onMarker2Change={handleDropLocationChange}
            firstLocationName={"Pick up"}
          />
        </div>
      </Wrapper>
    );
}

export default BookRidePage;