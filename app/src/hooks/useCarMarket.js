import { useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import carMarketAbi from "../abi/carMarketABI.json";
import nftCarAbi from "../abi/dynamicNFTCarABI.json";

const useCarMarket = ({ onBuyCarSuccess }) => {
  const { address } = useAccount();

  const {
    data: carOwner,
    isLoading: getOwnerLoading,
    isError: getOwnerError,
    refetch: refetchOwner
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_NFT_CAR_CONTRACT_ADDRESS,
    abi: nftCarAbi,
    functionName: "ownerOf"
  });

  const {
    data: buyCarHash,
    writeContract: buyCar,
    isPending: buyCarLoading,
    isError: buyCarError
  } = useWriteContract();

  const { isSuccess: buyCarSuccess, isLoading: buyCarReceiptLoading } =
    useWaitForTransactionReceipt({
      hash: buyCarHash,
      query: {
        enabled: Boolean(buyCarHash)
      }
    });

  useEffect(() => {
    if (buyCarSuccess) {
      onBuyCarSuccess?.();
      refetchOwner();
    }
  }, [buyCarSuccess]);//eslint-disable-line

  return {
    address,
    carOwner,
    getOwnerLoading,
    getOwnerError,
    refetchOwner,
    buyCar: (tokenId, payedPrice) =>
      buyCar?.({
        address: process.env.NEXT_PUBLIC_CAR_MARKET_CONTRACT_ADDRESS,
        abi: carMarketAbi,
        functionName: "buyCar",
        args: [tokenId],
        value: payedPrice,
      }),
    buyCarLoading,
    buyCarError,
    buyCarReceiptLoading
  };
};

export default useCarMarket;
