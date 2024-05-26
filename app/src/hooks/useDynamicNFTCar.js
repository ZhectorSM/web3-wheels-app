import { useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import abi from "../abi/dynamicNFTCarABI.json";

const useDynamicNFTCar = ({
  onCarMintSuccess,
  onCarUpdateSuccess,
  onCarSaleSuccess,
  onCarPurchaseSuccess
}) => {
  const { address } = useAccount();

  const {
    data: fleet,
    isLoading: getFleetLoading,
    isError: getFleetError,
    refetch: refetchFleet
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    functionName: "getFleet"
  });

  const {
    data: mintCarHash,
    writeContract: mintCar,
    isPending: mintCarLoading,
    isError: mintCarError
  } = useWriteContract();

  const { isSuccess: mintSuccess, isLoading: mintLoading } =
    useWaitForTransactionReceipt({
      hash: mintCarHash,
      query: {
        enabled: Boolean(mintCarHash)
      }
    });

  const {
    data: updateCarHash,
    writeContract: updateCar,
    isPending: updateCarLoading,
    isError: updateCarError
  } = useWriteContract();

  const { isSuccess: updateSuccess, isLoading: updateLoading } =
    useWaitForTransactionReceipt({
      hash: updateCarHash,
      query: {
        enabled: Boolean(updateCarHash)
      }
    });

  const {
    data: saleCarHash,
    writeContract: saleCar,
    isPending: saleCarLoading,
    isError: saleCarError
  } = useWriteContract();

  const { isSuccess: saleSuccess, isLoading: saleLoading } =
    useWaitForTransactionReceipt({
      hash: saleCarHash,
      query: {
        enabled: Boolean(saleCarHash)
      }
    });

  const {
    data: buyCarHash,
    writeContract: buyCar,
    isPending: buyCarLoading,
    isError: buyCarError
  } = useWriteContract();

  const { isSuccess: purchaseSuccess, isLoading: purchaseLoading } =
    useWaitForTransactionReceipt({
      hash: buyCarHash,
      query: {
        enabled: Boolean(buyCarHash)
      }
    });

  useEffect(() => {
    if (mintSuccess) {
      onCarMintSuccess?.();
      refetchFleet();
    }
    if (updateSuccess) {
      onCarUpdateSuccess?.();
      refetchFleet();
    }
    if (saleSuccess) {
      onCarSaleSuccess?.();
      refetchFleet();
    }
    if (purchaseSuccess) {
      onCarPurchaseSuccess?.();
      refetchFleet();
    }
  }, [mintSuccess, updateSuccess, saleSuccess, purchaseSuccess]);

  return {
    address,
    fleet,
    getFleetLoading,
    getFleetError,
    refetchFleet,
    mintCar: (to, name, description, image, vin, location, price_usd) =>
      mintCar?.({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi,
        functionName: "safeMintWithValues",
        args: [to, name, description, image, vin, location, price_usd]
      }),
    mintCarLoading,
    mintCarError,
    updateCar: (tokenId, mileage_km, reputation, expenses, revenue) =>
      updateCar?.({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi,
        functionName: "updateCarEOD",
        args: [tokenId, mileage_km, reputation, expenses, revenue]
      }),
    updateCarLoading,
    updateCarError,
    saleCar: (tokenId, carMarket, listing_price_usd) =>
      saleCar?.({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi,
        functionName: "setForSale",
        args: [tokenId, carMarket, listing_price_usd]
      }),
    saleCarLoading,
    saleCarError,
    buyCar: (tokenId, buyer, payedPrice) =>
      buyCar?.({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi,
        functionName: "buyCar",
        args: [tokenId, buyer, payedPrice]
      }),
    buyCarLoading,
    buyCarError
  };
};

export default useDynamicNFTCar;
