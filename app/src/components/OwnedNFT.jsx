import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import Image from "next/image";
import { Button } from "./ui/button";

const OwnedNFT = ({
  name,
  description,
  vin,
  imageURL,
  status,
  mileage,
  revenue,
  expenses,
  onSetForSale,
  saleLoading
}) => {
  mileage = String(mileage);
  revenue = String(revenue);
  expenses = String(expenses);
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 border dark:border-gray-700 hover:shadow-xl transition-transform duration-200">
      <CardHeader className="flex justify-end items-start h-fit m-0 mb-4 p-0">
        <p
          className={`${
            status === 1
              ? "bg-green-500 text-white"
              : 2
              ? "bg-blue-500 text-white"
              : "bg-red-500 text-white"
          } rounded-full px-3 py-1 text-xs font-semibold`}
        >
          {status === 1 ? "For Sale" : status === 2 ? "New" : "Owned"}
        </p>
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
      <CardTitle className="mb-2 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between">
          <span>{name}</span>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 w-fit">
            VIN: {vin}
          </div>
        </div>
      </CardTitle>
      <CardDescription className="mb-4 text-gray-700 dark:text-gray-300">
        {description}
      </CardDescription>
      <CardFooter className="flex flex-col gap-1 px-0">
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 dark:bg-gray-700 w-full justify-between mb-1 text-gray-500 dark:text-gray-400">
          <div>Revenue</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            ${revenue}
          </div>
        </div>
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 dark:bg-gray-700 w-full justify-between mb-1 text-gray-500 dark:text-gray-400">
          <div>Expenses</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            ${expenses}
          </div>
        </div>
        <div className="flex items-center p-1 px-2 rounded-md bg-zinc-100 dark:bg-gray-700 w-full justify-between mb-1 text-gray-500 dark:text-gray-400">
          <div>Mileage</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            {mileage} km
          </div>
        </div>
        <Select className="w-full mb-4">
          <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700">
            <SelectValue placeholder="Operating Mode" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            <SelectGroup>
              <SelectLabel>Operating Mode</SelectLabel>
              <SelectItem value="min-wait-time">Minimize Wait Time</SelectItem>
              <SelectItem value="max-passenger">Maximize Passengers</SelectItem>
              <SelectItem value="min-expenses">Minimize Expenses</SelectItem>
              <SelectItem value="max-revenue">Maximize Revenue</SelectItem>
              <SelectItem value="nearby">Stay Near Home</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="w-full mb-2">Update Mode</Button>
        {status !== "FOR_SALE" && (
          <Button
            onClick={onSetForSale}
            disabled={saleLoading}
            className="w-full bg-zinc-900 text-gray-50 hover:bg-zinc-900/80 focus-visible:ring-zinc-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-400 transition duration-75 active:bg-black active:translate-x-0.5 active:translate-y-0.5"
          >
            {saleLoading ? "Setting for Sale..." : "Set for Sale"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OwnedNFT;
