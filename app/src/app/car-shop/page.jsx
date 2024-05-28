"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Wrapper from '@/components/Wrapper';
import CarNFT from '@/components/CarNFT';

const CarShop = () => {
    const [cars, setCars] = useState([]);

    const demoCars = [
      {
        id: 1,
        name: "Tesla Model S",
        description: "The Tesla Model S is a fully electric luxury sedan.",
        vin: "TX1264",
        price: 94000,
        mileage: 1236,
        image:"https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        name: "Porsche Taycan",
        vin: "LXZ264",
        price: 89800,
        mileage: 686,
        description: "The Porsche Taycan is a fully electric luxury sports car.",
        image:"https://images.unsplash.com/photo-1627454766066-4c89c65c9d73?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 3,
        name: "Audi e-tron",
        vin: "PR7264",
        price: 28000,
        mileage: 896,
        description: "The Audi e-tron is a fully electric luxury SUV.",
        image:"https://images.unsplash.com/photo-1629897874832-a2e2f0d3715d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    useEffect(() => {
        setCars(demoCars);
    }, []);
    // useEffect(() => {
    //     const fetchCars = async () => {
    //         try {
    //             const response = await axios.get('/api/cars'); // Replace with your API endpoint
    //             setCars(response.data);
    //         } catch (error) {
    //             console.error('Error fetching cars:', error);
    //         }
    //     };

    //     fetchCars();
    // }, []);

    return (
      <Wrapper className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Car Shop
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarNFT
              key={car.id}
              name={car.name}
              description={car.description}
              vin={car.vin}
              mileage={car.mileage}
              price={car.price}
              imageURL={car.image}
            />
          ))}
        </div>
      </Wrapper>
    );
};

export default CarShop;