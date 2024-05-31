"use client"
import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback } from "react";
import Wrapper from "@/components/Wrapper";
import MintForm from "@/components/MintForm";
import { toast } from "react-toastify";
import { uploadToPinata } from "@/utils/pinata";
import useDynamicNFTCar from "@/hooks/useDynamicNFTCar";
import axios from "axios";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const MintCarNFT = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState([
    40.76143087283338, -73.97952938481274
  ]);
  const [vin, setVin] = useState("");
  const [description, setDescription] = useState("");
  const [garageAddress, setGarageAddress] = useState("");

  const { address, mintCar, mintCarLoading, mintCarError, onCarMintSuccess } =
    useDynamicNFTCar({
      onCarMintSuccess: () =>
        toast.success("Car minted successfully!🚗", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "light"
        }),
      onCarUpdateSuccess: () =>
        toast.success("Car updated successfully!🛠️", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "light"
        }),
      onCarSaleSuccess: () =>
        toast.success("Car listed for sale successfully!📈", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "light"
        }),
      onCarPurchaseSuccess: () =>
        toast.success("Car purchased successfully!💸", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "light"
        })
    });

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleDescriptionChange = useCallback(
    (e) => setDescription(e.target.value),
    []
  );
  const handlePriceChange = useCallback((e) => setPrice(e.target.value), []);
  const handleLocationChange = useCallback(
    (location) => setLocation(location),
    []
  );
  const handleVinChange = useCallback((e) => setVin(e.target.value), []);
  const handleFileChange = useCallback((e) => setImage(e.target.files[0]), []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!name || !price || !image || !vin) {
        toast.error("Please fill all the fields!");
        return;
      }

      try {
        const ipfsHash = await uploadToPinata(image);
        console.log(ipfsHash);

        await mintCar(
          address,
          name,
          description,
          ipfsHash,
          vin,
          location.toString(),
          price
        );

        toast.info("Car minting request sent", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "light"
        });
      } catch (error) {
        console.error("Error minting car:", error);
        toast.error("Failed to mint the car. Please try again later.", {
          position: "bottom-center",
          className: "text-md font-medium",
          theme: "dark"
        });
      } finally {
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setVin("");
      }
    },
    [address, description, image, location, mintCar, name, price, vin]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gar = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location[0]}&lon=${location[1]}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
        );
        setGarageAddress(gar.data.features[0].properties.formatted);
        console.log(gar.data.features[0].properties.formatted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <Wrapper className="flex flex-row justify-center gap-6 p-8 px-28">
      <MintForm
        onNameChange={handleNameChange}
        onPriceChange={handlePriceChange}
        onFileChange={handleFileChange}
        onVinChange={handleVinChange}
        onLocationChange={handleLocationChange}
        location={location}
        onSubmit={handleSubmit}
        mintLoading={mintCarLoading}
        mintError={mintCarError}
        garageAddress={garageAddress}
        onDescriptionChange={handleDescriptionChange}
      />
      <div className="p-3 h-[560px] w-[800px] border-zinc-200 border-2 rounded-md m-2">
        <Map
          location1={location}
          onMarker1Change={handleLocationChange}
          firstLocationName={"Home"}
        />
      </div>
    </Wrapper>
  );
};

export default MintCarNFT;
