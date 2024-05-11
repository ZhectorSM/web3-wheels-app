"use client";
import React, { useState } from "react";
// import { create } from 'pinata-client';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

import Wrapper from "@/components/Wrapper";
import MintForm from "@/components/MintForm";

const MintCarNFT = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mileage, setMileage] = useState("");
  const [location, setLocation] = useState(null);
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
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleVinChange = (e) => {
    setVin(e.target.value);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <Wrapper className="flex justify-between flex-row gap-6  p-10">
      <MintForm
        onNameChange={handleNameChange}
        onSizeChange={handleSizeChange}
        onPriceChange={handlePriceChange}
        onFileChange={handleFileChange}
        onMileageChange={handleMileageChange}
        onLocationChange={handleLocationChange}
        onVinChange={handleVinChange}
      />
      <div className="min-w-48">
        {name} {size} {price} {mileage} {vin}
      </div>
    </Wrapper>
  );
};

export default MintCarNFT;
