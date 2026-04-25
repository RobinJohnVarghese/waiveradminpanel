"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Command as CommandPrimitive } from "cmdk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Pencil,
  PlusIcon,
  PlusSquare,
  PlusSquareIcon,
  Trash,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CabRideCostType,
  Location,
  UserDetails,
  VehicleType,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import ImageWidget from "./image-widget";
import toast from "react-hot-toast";
import ImageInput from "@/components/custom-component/image-input";
import { formatImageUrl } from "@/utils/helper";

interface Props {
  initialData?: any;
  locations: Location[];
  vehicleTypes: VehicleType[];
}

export const CostForm = ({ initialData, locations, vehicleTypes }: Props) => {
  const session = useSession();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedVehicleTypes: VehicleType[] = vehicleTypes.filter(vehicle =>
    initialData?.vehicle_types?.map(String).includes(String(vehicle.id))
  );

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<VehicleType[]>(() => {
    const initIds: string[] =
      initialData?.vehicle_type
        ? [String(initialData.vehicle_type)]
        : Array.isArray(initialData?.vehicle_types)
          ? initialData.vehicle_types.map(String)
          : [];
    return vehicleTypes.filter(vehicle =>
      initIds.includes(String(vehicle.id))
    );
  });
  const [inputValue, setInputValue] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  const selectables = vehicleTypes?.filter((vehicle) => !selected.includes(vehicle));

  const promptSchema = z.object({
    id: z.string().optional(),
    // vehicle_type: z.array(z.string()).nonempty({ message: 'Vehicle type is required.' }),
    vehicle_type: z.string(),
    name: z.string(),
    subtext: z.string(),
    cost_per_km: z.coerce.number(),
    cost_per_minutes: z.coerce.number(),
    min_rate: z.coerce.number(),
    min_rate_km: z.coerce.number(),
    location: z.string(),
    return_charge: z.coerce.number(),
    image: z.any().optional(),
    ride_status: z.string(),
  });

  const defaultValues = {
    ...initialData,
    ...{
      vehicle_type: String(initialData?.vehicle_type),
      location: String(initialData?.location),
    },
  };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });
  const { setValue, watch, formState: { errors }, } = form;

  const [selectedImage, setSelectedImage] = useState<Blob>();
  console.log('errors', errors);

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    // if (!initialData?.image) {
    //   formData.append("image", selectedImage!);
    // }
    if (initialData?.id) {
      formData.append("id", initialData.id!);
    }
    if (data.image instanceof File) {
      formData.append("image", data.image!);
    }
    formData.append("vehicle_types", selected.map(item => item.id).join(','));
    formData.append("vehicle_type", selected.map(item => item.id).join(','));
    formData.append("name", data.name);
    formData.append("subtext", data.subtext);
    formData.append("cost_per_km", String(data.cost_per_km));
    formData.append("cost_per_minutes", String(data.cost_per_minutes));
    formData.append("min_rate", String(data.min_rate));
    formData.append("min_rate_km", String(data.min_rate_km));
    formData.append("location", data.location);
    formData.append("return_charge", String(data.return_charge));

    if (initialData?.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/cab-ride-cost-management/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success");
          router.push("/ride");
          router.refresh();
        })
        .catch((error) => {
          toast.error("failed");
          // console.log(error.data);
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/cab-ride-cost-management/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success");
          router.push("/ride");
          router.refresh();
        })
        .catch((error) => {
          // console.log(error.data);
          toast.error("failed");
        });
    }
  }


  const handleUnselect = useCallback((vehicle: VehicleType) => {
    setSelected((prev) => prev.filter((s) => s.id !== vehicle.id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }

        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  console.log('selected', selected);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          {/* <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleTypes &&
                      vehicleTypes.length > 0 &&
                      vehicleTypes.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div>
            <FormLabel>Vehicle Type</FormLabel>
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selected.map((vehicle) => {
                    return (
                      <Badge key={vehicle.id} variant="secondary">
                        {vehicle.name}
                        <button
                          className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUnselect(vehicle);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={() => handleUnselect(vehicle)}
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                      </Badge>
                    );
                  })}
                  {/* Avoid having the "Search" Icon */}
                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setCommandOpen(false)}
                    onFocus={() => setCommandOpen(true)}
                    placeholder="Select vehicle types..."
                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                  />
                </div>
              </div>
              <div className="relative mt-2">
                {commandOpen && selectables && selectables?.length > 0 ? (
                  <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandGroup className="h-full overflow-auto">
                      {selectables.map((vehicle) => {
                        return (
                          <CommandItem
                            key={vehicle.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={(value) => {
                              setInputValue("");
                              setSelected((prev) => [...prev, vehicle]);
                            }}
                            className={"cursor-pointer"}
                          >
                            {vehicle.name}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </div>
                ) : null}
              </div>
            </Command>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Ride Name</FormLabel>
                <Input placeholder="Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtext"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Ride Description</FormLabel>
                <Input placeholder="Description" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost_per_km"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Cost Per Km</FormLabel>
                <Input type="number" placeholder="Cost Per Km" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost_per_minutes"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Cost Per Minutes</FormLabel>
                <Input type="number" placeholder="Cost Per Minutes" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="min_rate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Min Rate</FormLabel>
                <Input type="number" placeholder="Min Rate" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="min_rate_km"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Min Rate Km</FormLabel>
                <Input placeholder="Min Rate Km" type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations &&
                      locations.length > 0 &&
                      locations.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="return_charge"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Return Charge</FormLabel>
                <Input placeholder="Return Charge" type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ride_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ride status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ATV">Active</SelectItem>
                    <SelectItem value="BCD">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-4">
            <ImageInput
              label='Image'
              name={`image`}
              src={
                ((watch('image') instanceof File) && URL.createObjectURL((watch('image')) as any)) ||
                (watch(`image`) &&
                  formatImageUrl(watch(`image`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`image`, event.target.files[0]);
              }}

              errorMessage={errors?.image?.message as string}
            />
          </div>
        </div>
        <div className="flex flex-col items-end w-full">
          <Button className="w-[100px] rounded-full" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
