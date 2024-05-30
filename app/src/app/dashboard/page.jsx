"use client";
import { useEffect } from "react";
import OwnedNFT from "@/components/OwnedNFT";
import StatsCard from "@/components/StatsCard";
import DollarSignIcon from "@/components/icons/dollar-sign";
import CreditCardIcon from "@/components/icons/credit-card";
import UsersIcon from "@/components/icons/users";
import ActivityIcon from "@/components/icons/activity";
import { toast } from "react-toastify";
import useDynamicNFTCar from "@/hooks/useDynamicNFTCar";
import axios from "axios";

export default function Dashboard() {
  const {
    address,
    fleet,
    getFleetLoading,
    getFleetError,
    refetchFleet,
    saleCar,
    saleCarLoading
  } = useDynamicNFTCar({
    onCarMintSuccess: () => {
      toast.success("Car minted successfully!🚗", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "dark"
      });
    },
    onCarUpdateSuccess: () => {
      toast.success("Car updated successfully!🛠️", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "dark"
      });
    },
    onCarSaleSuccess: () => {
      toast.success("Car listed for sale successfully!📈", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "dark"
      });
      refetchFleet();
    },
    onCarPurchaseSuccess: () => {
      toast.success("Car purchased successfully!💸", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "dark"
      });
      refetchFleet();
    }
  });

  useEffect(() => {
    if (address) {
      refetchFleet();
    }
  }, [address, refetchFleet]); //eslint-disable-line

  const handleSetForSale = async(carId, listingPrice) => {
    const price = typeof listingPrice === "bigint" ? Number(listingPrice) : listingPrice;
    console.log(`Setting car with ID ${carId} for sale at price ${price}`);
    try{
    await saleCar(carId, process.env.NEXT_PUBLIC_CAR_MARKET_CONTRACT_ADDRESS, price);

    }catch(error){ 
        console.error("Error setting car for sale:", error);
      };
  };

  console.log(
    "Car Market Contract Address:",
    process.env.NEXT_PUBLIC_CAR_MARKET_CONTRACT_ADDRESS
  );
  console.log(
    "NFT Car Contract Address:",
    process.env.NEXT_PUBLIC_NFT_CAR_CONTRACT_ADDRESS
  );


  const dextools = async () => {
    try {
      const res = await axios.get(
        "https://public-api.dextools.io/free/v2/blockchains",
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (fleet && fleet.length > 0) {
      console.log(fleet);
    }
  }, [fleet]);

  return (
    <div className="container mx-auto py-8 pb-14 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Revenue" value="$4,951" up="20.47">
          <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Expenses" value="$1,436" up="14.93">
          <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Passengers" value="57" up="31.24">
          <UsersIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Mileage" value="81 km" up="28.13">
          <ActivityIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Your Car NFTs
        </h2>
        {getFleetLoading ? (
          <p>Loading your NFTs...</p>
        ) : getFleetError ? (
          <p>You have no Web3 Wheel😔 </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fleet && fleet.length > 0 ? (
              fleet.map((nft, index) => ({ ...nft, id: index })).filter((nft) => nft.owner === address)
                .map((nft) => (
                    <OwnedNFT
                      key={nft.id}
                      name={nft.name}
                      description={nft.description}
                      imageURL={nft.image}
                      vin={nft.vin}
                      revenue={nft.revenue}
                      expenses={nft.expenses}
                      mileage={nft.mileage_km}
                      status={nft.status}
                      onSetForSale={() =>
                        handleSetForSale(nft.id, nft.price_usd)
                      }
                      saleLoading={saleCarLoading}
                    />
                  )
                )
            ) : (
              <p>No NFTs owned by this address.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
