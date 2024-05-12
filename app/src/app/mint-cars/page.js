"use client";
import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import MintForm from "@/components/MintForm";
import Map from "@/components/Map";
import { toast } from "react-toastify";

const MintCarNFT = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([40.74005, -73.986562]);
  const [mileage, setMileage] = useState("");
  const [vin, setVin] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const handleSizeChange = (value) => {
    setSize(value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleMileageChange = (e) => {
    setMileage(e.target.value);
  };
  const handleLocationChange = (location) => {
    console.log(location)
    setLocation(location);
  };
  const handleVinChange = (e) => {
    setVin(e.target.value);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mintingFunction = new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await toast.promise(mintingFunction, {
      pending: {
        render: "Minting your web3 wheel... 🚗",
        position: "bottom-right",
        theme: "dark",
        className: "text-md font-medium"
      },
      success: "You web3 wheel has been successfully minted! 🎉",
      error: "There was some error! 😢"
    });
    
    console.log(response);
  }
  
  return (
    <Wrapper className="flex flex-row justify-center gap-6 p-10 px-28">
      <MintForm
        onNameChange={handleNameChange}
        onSizeChange={handleSizeChange}
        onPriceChange={handlePriceChange}
        onFileChange={handleFileChange}
        onMileageChange={handleMileageChange}
        onVinChange={handleVinChange}
        onLocationChange={handleLocationChange}
        location={location}
        onSubmit={handleSubmit}
      />
      <div className="p-3 h-[560px] w-[800px] border-zinc-300 border rounded-md">
        <Map location={location} onMarkerChange={handleLocationChange} />
      </div>
    </Wrapper>
  );
};

export default MintCarNFT;
