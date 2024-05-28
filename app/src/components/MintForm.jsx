import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function MintForm({
  onNameChange,
  // onSizeChange,
  onPriceChange,
  onFileChange,
  onLocationChange,
  onVinChange,
  onSubmit,
  location,
  mintLoading,
  onDescriptionChange,
  mintError,
  garageAddress,
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
        <fieldset className="grid gap-4 rounded-lg border-2 p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Car Details
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Texla Model Z"
              onChange={(e) => onNameChange(e)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder=""
              onChange={(e) => onDescriptionChange(e)}
            />
          </div>
          {/* <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <Select onValueChange={onSizeChange}>
                <SelectTrigger
                  id="size"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>
                          <span className="font-medium text-foreground">
                            Small
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Mini Car
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>
                          <span className="font-medium text-foreground">
                            Medium
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Sedan Car
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="large">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>
                          <span className="font-medium text-foreground">
                            Large
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          SUV Car
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                min="0"
                type="number"
                placeholder="Km"
                onChange={(e) => onMileageChange(e)}
              />
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="vin">Vehicle Identification Number(VIN)</Label>
              <Input
                id="vin"
                type="text"
                placeholder="XXXXX"
                onChange={(e) => onVinChange(e)}
              />
            </div>
            <div className="grid gap-6">
              <Label htmlFor="price">Price in USDC</Label>
              <Input
                id="price"
                min="10000"
                type="number"
                placeholder="10000"
                onChange={(e) => onPriceChange(e)}
              />
            </div>
          </div>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Garage Location
            </legend>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 row-span-2 gap-2">
                <div className="grid gap-0">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    placeholder="0.0"
                    step="0.0001"
                    onChange={handleLatChange}
                    value={loc[0]}
                  />
                </div>
                <div className="grid gap-0">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    placeholder="0.0"
                    step="0.0001"
                    onChange={handleLngChange}
                    value={loc[1]}
                  />
                </div>
              </div>
              <p className="text-sm font-light">
                <span className="font-medium">Address:</span> {garageAddress}
              </p>
            </div>
          </fieldset>
          <div className="grid gap-3">
            <Label htmlFor="image">Car Image</Label>
            <Input id="image" type="file" onChange={(e) => onFileChange(e)} />
          </div>
          <div className="grid ">
            <p className="font-medium text-sm text-red-600">
              {mintError && "There was some error"}
            </p>
            <Button onClick={onSubmit}>
              {mintLoading ? "Minting..." : "Mint"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
