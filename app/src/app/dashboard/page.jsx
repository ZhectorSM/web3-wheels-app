"use client"
import OwnedNFT from "@/components/OwnedNFT";
import StatsCard from "@/components/StatsCard";
import DollarSignIcon from "@/components/ui/DollarSignIcon";
import CreditCardIcon from "@/components/ui/CreditCardIcon";
import UsersIcon from "@/components/ui/UsersIcon";
import ActivityIcon from "@/components/ui/ActivityIcon";
import useDynamicNFTCar from "@/hooks/useDynamicNFTCar";


export default function Dashboard() {
  const onCarMintSuccess = () => {
    toast.success("Car minted successfully!🚗", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  };

  const onCarPurchaseSuccess = () => {
    toast.success("Car purchased successfully!💸", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  };

  const onCarSaleSuccess = () => {
    toast.success("Car listed for sale successfully!📈", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  };

  const onCarUpdateSuccess = () => {
    toast.success("Car updated successfully!🛠️", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  };

  const { address, fleet, getFleetLoading, getFleetError, refetchFleet } =
    useDynamicNFTCar({
      onCarMintSuccess,
      onCarPurchaseSuccess,
      onCarSaleSuccess,
      onCarUpdateSuccess
    });

  // useEffect(() => {
  //   if (address) {
  //     refetchFleet();
  //   }
  // }, [address]);
  return (
    <div className="container mx-auto py-8 pb-14 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Revenue" value="$45,951" up="20.47">
          <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Expenses" value="$19,436" up="14.93">
          <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Passengers" value="457" up="31.24">
          <UsersIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
        <StatsCard title="Total Mileage" value="8621 km" up="28.13">
          <ActivityIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </StatsCard>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Your Car NFTs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <OwnedNFT
            name="Texla Model Z"
            description="A car that runs on electricity."
            imageURL="https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            vin="1234567890"
            revenue="1000"
            expenses="500"
            mileage="10000"
            forSale={true}
          />
          <OwnedNFT
            name="Porsche Taycan"
            description="A car that runs on electricity."
            imageURL="https://images.unsplash.com/photo-1627454766066-4c89c65c9d73?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            vin="NY12670"
            revenue="1800"
            expenses="900"
            mileage="16000"
            forSale={true}
          />
          <OwnedNFT
            name="Audi e-tron"
            description="A car that runs on electricity."
            imageURL="https://images.unsplash.com/photo-1629897874832-a2e2f0d3715d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            vin="KI890"
            revenue="1000"
            expenses="500"
            mileage="10000"
            forSale={false}
          />
          <OwnedNFT
            name="Fiat 500e"
            description="electricity driven car"
            imageURL="https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            vin="TX7890"
            revenue="1500"
            expenses="500"
            mileage="17000"
            forSale={true}
          />
        </div>
      </div>
    </div>
  );
}
