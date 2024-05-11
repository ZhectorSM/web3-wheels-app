import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function MintForm({
  onNameChange,
  onSizeChange,
  onPriceChange,
  onFileChange,
  onMileageChange,
  onLocationChange,
  onVinChange
}) {
  return (
    <div className="relative flex-col items-start gap-8 md:flex w-96 min-w-96">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border-2 p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Car Details
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tesla Model S"
              onChange={(e) => onNameChange(e)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
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
                min="1"
                type="number"
                placeholder="8"
                onChange={(e) => onMileageChange(e)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="vin">Vehicle Identification Number(VIN)</Label>
              <Input
                id="vin"
                min="1000"
                type="number"
                placeholder="XXXXX"
                onChange={(e) => onVinChange(e)}
              />
            </div>
            <div className="grid gap-6">
              <Label htmlFor="price">Price in USDC</Label>
              <Input
                id="price"
                min="1000"
                type="number"
                placeholder="8"
                onChange={(e) => onPriceChange(e)}
              />
            </div>
          </div>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Garage Location
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" type="number" placeholder="0.0" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" type="number" placeholder="0.0" />
              </div>
            </div>
          </fieldset>
          <div className="grid gap-3">
            <Input id="image" type="file" onChange={(e) => onFileChange(e)} />
          </div>
        </fieldset>

        <div className="grid gap-3">
          <Button>Mint</Button>
        </div>
      </form>
    </div>
  );
}
