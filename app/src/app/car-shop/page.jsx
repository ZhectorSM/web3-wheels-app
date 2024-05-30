"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import CarNFT from "@/components/CarNFT";
import useDynamicNFTCar from "@/hooks/useDynamicNFTCar";
import useCarMarket from "@/hooks/useCarMarket";
import { toast } from "react-toastify";

const CarShop = () => {
  const [cars, setCars] = useState([]);
  const { fleet, refetchFleet, getFleetLoading, getFleetError } =
    useDynamicNFTCar({});
  const { buyCar, buyCarLoading, buyCarError } = useCarMarket({
    onBuyCarSuccess: () => {
      toast.success("Car purchased successfully!💸", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "light"
      });
      refetchFleet();
    }
  });

  useEffect(() => {
    if (fleet) {
      setCars(fleet);
      console.log(fleet);
    }
  }, [fleet]);

  const handleBuyCar = async (carId, price) => {
    try{
    await buyCar(carId, price);
    toast.info("Buy request sent", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "light"
    });
    } catch(error){
      console.log("Error buying car: ", error);
    }
  };

  return (
    <Wrapper className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Car Shop
      </h2>
      {getFleetLoading && <p>Loading cars...</p>}
      {getFleetError && <p>Error loading cars. Please try again.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars
          .map((car, index) => ({ ...car, id: index }))
          .filter((car) => car.status === 1)
          .map((car) => (
            <CarNFT
              key={car.id}
              id={car.id}
              name={car.name}
              description={car.description}
              vin={car.vin}
              mileage={car.mileage_km}
              price={car.price_usd}
              imageURL={car.image}
              onBuy={() => handleBuyCar(car.id, car.price_usd)}
              buyLoading={buyCarLoading}
              buyError={buyCarError}
            />
          ))}
      </div>
    </Wrapper>
  );
};

export default CarShop;
