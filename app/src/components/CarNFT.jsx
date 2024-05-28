import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

const CarNFT = ({
  name,
  description,
  vin,
  imageURL,
  mileage,
  price
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-[1.02]  border hover:shadow-lg hover:shadow-zinc-400 transition">
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
        <div className="flex mb-4 items-center p-1 px-2 rounded-md bg-zinc-100 w-full justify-between text-gray-500 dark:text-gray-400">
          <div>Mileage</div>
          <div className="text-gray-800 dark:text-gray-100 font-medium">
            {mileage} km
          </div>
        </div>
        <Button
          className="w-full hover:shadow-sm hover:bg-zinc-900 hover:shadow-black transition duration-75 active:bg-zinc-900 active:translate-x-0.5 active:translate-y-0.5"
          onClick={() => console.log("Buying...")}
        >{`Buy for ${price} USDC`}</Button>
      </CardFooter>
    </Card>
  );
};
export default CarNFT;
