import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function MintForm({
  onNameChange,
  onPriceChange,
  onFileChange,
  onLocationChange,
  onVinChange,
  onSubmit,
  location,
  mintLoading,
  onDescriptionChange,
  mintError,
  garageAddress
}) {
  const [loc, setLoc] = useState(location);

  useEffect(() => {
    setLoc(location);
  }, [location]);

  const handleLatChange = (e) => {
    const newLat = e.target.value;
    onLocationChange([newLat, loc[1]]);
  };

  const handleLngChange = (e) => {
    const newLng = e.target.value;
    onLocationChange([loc[0], newLng]);
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex w-96 min-w-96">
      <form className="grid w-full items-start gap-6" onSubmit={onSubmit}>
        <fieldset className="grid gap-4 rounded-lg border-2 p-4 border-gray-200 dark:border-gray-700">
          <legend className="-ml-1 px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Car Details
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Texla Model Z"
              onChange={(e) => onNameChange(e)}
              className="dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder=""
              onChange={(e) => onDescriptionChange(e)}
              className="dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="vin" className="text-gray-700 dark:text-gray-300">
                Vehicle Identification Number (VIN)
              </Label>
              <Input
                id="vin"
                type="text"
                placeholder="XXXXX"
                onChange={(e) => onVinChange(e)}
                className="dark:bg-gray-800 dark:text-gray-300"
              />
            </div>
            <div className="grid gap-6">
              <Label
                htmlFor="price"
                className="text-gray-700 dark:text-gray-300"
              >
                Price in USDC
              </Label>
              <Input
                id="price"
                min="10000"
                type="number"
                placeholder="10000"
                onChange={(e) => onPriceChange(e)}
                className="dark:bg-gray-800 dark:text-gray-300"
              />
            </div>
          </div>
          <fieldset className="grid gap-6 rounded-lg border p-4 border-gray-200 dark:border-gray-700">
            <legend className="-ml-1 px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Garage Location
            </legend>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 row-span-2 gap-2">
                <div className="grid gap-0">
                  <Label
                    htmlFor="latitude"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    placeholder="0.0"
                    step="0.0001"
                    onChange={handleLatChange}
                    value={loc[0]}
                    className="dark:bg-gray-800 dark:text-gray-300"
                  />
                </div>
                <div className="grid gap-0">
                  <Label
                    htmlFor="longitude"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    placeholder="0.0"
                    step="0.0001"
                    onChange={handleLngChange}
                    value={loc[1]}
                    className="dark:bg-gray-800 dark:text-gray-300"
                  />
                </div>
              </div>
              <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                <span className="font-medium">Address:</span> {garageAddress}
              </p>
            </div>
          </fieldset>
          <div className="grid gap-3">
            <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">
              Car Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => onFileChange(e)}
              className="dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="grid">
            <p className="font-medium text-sm text-red-600 dark:text-red-400">
              {mintError && "There was some error"}
            </p>
            <Button className="bg-slate-900 dark:bg-blue-900" onClick={onSubmit}>
              {mintLoading ? "Minting..." : "Mint"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
