# Simulation Backend API

## Overview

This backend API is designed to manage a simulation of vehicles and passengers. It provides endpoints to add new vehicles and passengers, retrieve their current positions, and fetch the overall state of the simulation.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ````
2. Install Dependencies
    ```bash
    npm install
    ````

3. Start the Server
    ```bash
    node index.js
    ```

## API Documentation

### Add new vehicle

- Endpoint: POST /sim/vehicles

- Description: Adds a new vehicle to the simulation.

- Request Example :
    ```json 
    {
        "tokenId": 4,
        "owner": "NftCar4",
        "name": "Mircidis",
        "description": "Autonomous vehicle",
        "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
        "vin": "LM4AC113061sdas105688",
        "location": "-73123.995018,40.73312986",
        "mileage_km": 60000,
        "reputation": 5,
        "price_usd": 40000,
        "expenses": 40,
        "revenue": 100,
        "data": [0, 60000, 5, 40000, 40, 100]
    }

    ```
- Success Response:
    ```json
    {
        "message": "Vehicle has been created successfully.",
        "vehicle": {
            "tokenId": 4,
            "owner": "NftCar4",
            "name": "Mircidis",
            "description": "Autonomous vehicle",
            "image": "https://ipfs.io/ipfs/QmSuwLBbmbNqi2Tpig5DzTtzFxpbcFV4yBwbbnX1nnTw5N",
            "vin": "LM4AC113061sdas105688",
            "location": "-73.9739026,40.7571447",
            "mileage_km": 60000,
            "reputation": 5,
            "price_usd": 40000,
            "expenses": 40,
            "revenue": 100,
            "data": [4, 60000, 5, 40000, 40, 100]
        }
    }
    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```

### Add new passenger

- Endpoint: POST /sim/passengers

- Description: Adds a new passenger to the simulation.

- Request Example :
    ```json 
   {
        "passengerId": 1,
        "name": "John Doe",
        "pickup": {
            "position": {
                "longitude": -73.9973219,
                "latitude": 40.7570936
            }
        },
        "dropoff": {
            "position": {
                "longitude": -73.9973219,
                "latitude": 40.7570936
            }
        }
    }


    ```
- Success Response:
    ```json
    {
        "message": "Passenger has been created successfully.",
        "passenger": {
            "passengerId": 1,
            "pickup": {
                "position": {
                    "node_id": 42433644,
                    "longitude": -73.9973219,
                    "latitude": 40.7570936
                }
            },
            "dropoff": {
                "position": {
                    "node_id": 42433644,
                    "longitude": -73.9973219,
                    "latitude": 40.7570936
                }
            },
            "status": 0,
            "ridePrice": 3
        }
    }

    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```


### Get Vehicle Positions

- Endpoint: GET sim/vehicles

- Description: Returns the current position and other details of all vehicles in the simulation.

- Success Response:
    ```json 
        [
            {
                "vehicleId": 0,
                "name": "Thesla",
                "reputation": 5,
                "vin": "LM4AC113061105688",
                "position": {
                    "longitude": -73.995018,
                    "latitude": 40.73986
                }
            },
            {
                "vehicleId": 1,
                "name": "Audio",
                "reputation": 6,
                "vin": "WAUKEAFM8DA033285",
                "position": {
                    "longitude": -73.9746686,
                    "latitude": 40.7395275
                }
            },
            {
                "vehicleId": 2,
                "name": "BeMeWe",
                "reputation": 7,
                "vin": "WAUKEAFM8DA033285",
                "position": {
                    "longitude": -73.9746686,
                    "latitude": 40.7395275
                }
            }
        ]
    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```


### Get Vehicle Details

- Endpoint: GET /sim/vehicles/:id

- Description: Retrieves the details of a specific vehicle in the simulation.

- Success Response:
    ```json 
    {
        "vehicleId": 1,
        "name": "Audio",
        "reputation": 6,
        "vin": "WAUKEAFM8DA033285",
        "position": {
            "node_id": 11543660372,
            "longitude": -73.9746686,
            "latitude": 40.7395275
        }
    }

    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```

### Get Passenger Positions

- Endpoint: GET /sim/passengers

- Description: Returns the current marker position of all passengers in the simulation.

- Success Response:
    ```json 
    [
        {
            "passengerId": 1,
            "position": {
                "node_id": 42433644,
                "longitude": -73.9973219,
                "latitude": 40.7570936
            }
        },
        {
            "passengerId": 2,
            "position": {
                "node_id": 42433644,
                "longitude": -73.9973219,
                "latitude": 40.7570936
            }
        }
    ]

    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```

### Get Specific Passenger Position

- GET /sim/passengers/:id

- Description: Returns the current marker position of a specific passenger in the simulation.

- Success Response:
    ```json 
    {
        "passengerId": 1,
        "position": {
            "node_id": 42433644,
            "longitude": -73.9973219,
            "latitude": 40.7570936
        }
    }


    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```

### Change Operation Mode of a Vehicle

- Endpoint: POST /sim/vehicles/operation-mode/1

- Description: Changes the operation of the vehicle with specific id 

- Request Example :
    ```json 
    {
        "operation_mode" : 1
    }


    ```
- Success Response:
    ```json
    {
        "message": "Vehicle operation mode has been updated successfully."
    }
    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```


### Get Simulation State

- GET /sim/

- Description: Returns the current state of the simulation, including the details of all vehicles and passengers.

- Success Response:
    ```json 
    {
        "vehicles": [
            {
                "tokenId": 1,
                "owner": "John Doe",
                "name": "Car",
                "description": "A car",
                "image": "https://example.com/car.jpg",
                "vin": "1234567890",
                "location": "37.7749,-122.4194",
                "mileage_km": 10000,
                "reputation": 5,
                "price_usd": 20000,
                "expenses": 5000,
                "revenue": 10000,
                "data": [1, 10000, 5, 20000, 5000, 10000]
            }
        ],
        "passengers": []
    }
    ```

- Error Response:
    ```json 
    {
        "error": "Error message"
    }
    ```

## License
This project is licensed under the MIT License.