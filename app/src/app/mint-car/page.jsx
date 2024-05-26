"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import MintForm from "@/components/MintForm";
import Map from "@/components/Map";
import { toast } from "react-toastify";
import { uploadToPinata } from "@/utils/pinata";
import useDynamicNFTCar from "@/hooks/useDynamicNFTCar";
import axios from "axios";

const MintCarNFT = () => {
  const [name, setName] = useState("");
  // const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([40.74005, -73.986562]);
  const [vin, setVin] = useState("");
  const [description, setDescription] = useState("");
  const [garageAddress, setGarageAddress] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  // const handleSizeChange = (value) => {
  //   setSize(value);
  // };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const handleVinChange = (e) => {
    setVin(e.target.value);
  };
  
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

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
  }

  const onCarSaleSuccess = () => {
    toast.success("Car listed for sale successfully!📈", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  }

  const onCarUpdateSuccess = () => {
    toast.success("Car updated successfully!🛠️", {
      position: "bottom-center",
      className: "text-md font-medium",
      theme: "dark"
    });
  }

  const { address, mintCar, mintCarLoading, mintCarError } = useDynamicNFTCar({onCarMintSuccess, onCarPurchaseSuccess, onCarSaleSuccess, onCarUpdateSuccess});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image || !vin) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);
    // const response = await toast.promise(mintingFunction, {
    //   pending: {
    //     render: "Minting your web3 wheel... 🚗",
    //     position: "bottom-right",
    //     theme: "dark",
    //     className: "text-md font-medium"
    //   },
    //   success: "You web3 wheel has been successfully minted! 🎉",
    //   error: "There was some error! 😢"
    // });
    
    // console.log(response);

     try {
       const ipfsHash = await uploadToPinata(image);
       console.log(ipfsHash);

       await mintCar(address, name, description, ipfsHash, vin, location, price);

       toast.success("Car minting request sent!", {
        position: "bottom-center",
        className: "text-md font-medium",
        theme: "dark"
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
      setLocation([40.74005, -73.986562]);
       setLoading(false);
     }
  }

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
        // onSizeChange={handleSizeChange}
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
        <Map location1={location} onMarker1Change={handleLocationChange} firstLocationName={"Home"}/>
      </div>
    </Wrapper>
  );
};

export default MintCarNFT;