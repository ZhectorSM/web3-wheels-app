"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CarPage = () => {
    const [cars, setCars] = useState([]);

    const demoCars = [
      {
        id: 1,
        name: "Tesla Model S",
        description: "The Tesla Model S is a fully electric luxury sedan.",
        image:
          "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 2,
        name: "Porsche Taycan",
        description:
          "The Porsche Taycan is a fully electric luxury sports car.",
        image:
          "https://images.unsplash.com/photo-1627454766066-4c89c65c9d73?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 3,
        name: "Audi e-tron",
        description: "The Audi e-tron is a fully electric luxury SUV.",
        image:
          "https://images.unsplash.com/photo-1629897874832-a2e2f0d3715d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Minted Car NFTs</h1>
            <div className="grid grid-cols-3 gap-4">
                {cars.map((car) => (
                    <div key={car.id} className="bg-white p-4 shadow">
                        <Image width={400} height={300} src={car.image} alt={car.name} className="w-full h-56 object-cover mb-2" />
                        <h2 className="text-lg font-bold">{car.name}</h2>
                        <p className="text-gray-500">{car.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarPage;