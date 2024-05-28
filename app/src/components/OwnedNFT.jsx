import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import Image from "next/image";

const OwnedNFT = ({ name, description, vin, imageURL, forSale, mileage, revenue, expenses }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-[1.02]  border hover:shadow-lg hover:shadow-zinc-400 transition">
      <CardHeader className="flex justify-end h-fit m-0 mb-1 p-0">
        <div className="flex-grow flex justify-end">
          <p
            className={`${
              forSale
                ? "bg-zinc-800 text-zinc-100 dark:bg-zinc-900 dark:text-zinc-100"
                : "bg-white text-black dark:bg-gray-800 dark:text-white"
            } rounded-xl w-fit border-1 border-zinc-400 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow`}
          >
            {!forSale ? "Not " : ""}For Sale
          </p>
        </div>
      </CardHeader>
      <Image
        alt={name}
        className="rounded-md mb-4 object-cover w-full"
        height={200}
        src={imageURL}
        style={{
          aspectRatio: "300/200",
          objectFit: "cover"
        }}
        width={300}
      />

      <CardTitle className="flex items-center justify-between mb-2">
        <span>{name}</span>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 w-fit mb-1">
          VIN: {vin}
        </div>
      </CardTitle>
      <CardDescription className="mb-2">{description}</CardDescription>
      <CardFooter className="flex flex-col gap-1 px-0">
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 w-full justify-between mb-2 text-gray-500 dark:text-gray-400">
          <div>Revenue</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            ${revenue}
          </div>
        </div>
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 w-full justify-between mb-2 text-gray-500 dark:text-gray-400">
          <div>Expenses</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            ${expenses}
          </div>
        </div>
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 w-full justify-between text-gray-500 dark:text-gray-400">
          <div>Mileage</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            {mileage} km
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OwnedNFT;
