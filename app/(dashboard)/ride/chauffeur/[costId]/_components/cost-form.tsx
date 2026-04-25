"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  vehicleTypes: VehicleType[];
}

export const CostForm = ({ initialData, vehicleTypes }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const session = useSession();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  const [selected, setSelected] = useState<VehicleType[]>((initialData?.vehicle_type || initialData?.vehicle_types) ? (initialData?.vehicle_type || initialData?.vehicle_types) : []);

  const promptSchema = z.object({
    id: z.string().optional(),
    vehicle_type: z.string(),
    name: z.string(),
    subtext: z.string(),
    ride_status: z.string(),

    image: z.any().optional(),

    min_charge_km: z.coerce.number(),
    min_charge_hr: z.coerce.number(),
    min_charge_amount: z.coerce.number(),
    min_charge_return_amount: z.coerce.number(),

    added_1_max_km: z.coerce.number(),
    added_1_max_hr: z.coerce.number(),
    added_1_amount: z.coerce.number(),
    added_2_max_km: z.coerce.number(),
    added_2_max_hr: z.coerce.number(),
    added_2_amount: z.coerce.number(),

    odt_max_km: z.coerce.number(),
    odt_max_hr: z.coerce.number(),
    odt_amount: z.coerce.number(),
    odt_after_max_km: z.coerce.number(),
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectables = vehicleTypes?.filter((vehicle) => !selected.includes(vehicle));

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    // if (!initialData?.image) {
    //   formData.append("image", selectedImage!);
    // }
    if (data.image instanceof File) {
      formData.append("image", data.image!);
    }
    formData.append("image", data.image!);
    formData.append("vehicle_types", selected.map(item => item.id).join(','));
    formData.append("vehicle_type", selected.map(item => item.id).join(','));
    formData.append("name", data.name);
    formData.append("subtext", data.subtext);
    formData.append("min_charge_km", String(data.min_charge_km));
    formData.append("min_charge_hr", String(data.min_charge_hr));
    formData.append("min_charge_amount", String(data.min_charge_amount));
    formData.append("min_charge_return_amount", String(data.min_charge_return_amount));
    formData.append("added_1_max_km", String(data.added_1_max_km));
    formData.append("added_1_max_hr", String(data.added_1_max_hr));
    formData.append("added_1_amount", String(data.added_1_amount));
    formData.append("added_2_max_km", String(data.added_2_max_km));
    formData.append("added_2_max_hr", String(data.added_2_max_hr));
    formData.append("added_2_amount", String(data.added_2_amount));
    formData.append("odt_max_km", String(data.odt_max_km));
    formData.append("odt_max_hr", String(data.odt_max_hr));
    formData.append("odt_amount", String(data.odt_amount));
    formData.append("odt_after_max_km", String(data.odt_after_max_km));

    if (initialData?.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/chauffeur-ride-cost-management/`,
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
          console.log(error.data);
          toast.error("failed")
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/chauffeur-ride-cost-management/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/ride/chauffeur");
          router.refresh();
        })
        .catch((error) => {
          toast.error("failed")
          // console.log(error.data);
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
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  if (!isMounted) {
    return null;
  }
  console.log('vehicleTypes', initialData, selected);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className="grid grid-cols-3 gap-3 mb-8">
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
              name="min_charge_return_amount"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Return Charge</FormLabel>
                  <Input type="number" placeholder="Return Charge" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="odt_after_max_km"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>After Max Km</FormLabel>
                  <Input placeholder="After Max Km" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-8">
            <h3 className="font-normal text-lg mb-4">Min Charge(Time Slab One)</h3>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="min_charge_km"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Km</FormLabel>
                    <Input type="number" placeholder="Km" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="min_charge_hr"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Hour</FormLabel>
                    <Input placeholder="Hour" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="min_charge_amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Amount</FormLabel>
                    <Input placeholder="Amount" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-normal text-lg mb-4">Added Hour</h3>
            <h5 className="font-normal text-md mb-2">Time Slab 2</h5>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="added_1_max_hr"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Upto Hrs</FormLabel>
                    <Input placeholder="Upto Hrs" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="added_1_max_km"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Max Km</FormLabel>
                    <Input type="number" placeholder="Max Km" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="added_1_amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Amount</FormLabel>
                    <Input placeholder="Amount" type="number"  {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h5 className="font-normal text-md mb-2">Time Slab 3</h5>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="added_2_max_hr"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Upto Hrs</FormLabel>
                    <Input placeholder="Upto Hrs" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="added_2_max_km"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Max Km</FormLabel>
                    <Input type="number" placeholder="Max Km" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="added_2_amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Amount</FormLabel>
                    <Input placeholder="Amount" type="number"  {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-normal text-lg mb-4">One Day Trip (Time Slab 4)</h3>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="odt_max_km"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Max Km</FormLabel>
                    <Input type="number" placeholder="Max Km" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="odt_max_hr"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Max Hour</FormLabel>
                    <Input placeholder="Max Hour" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="odt_amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Amount</FormLabel>
                    <Input placeholder="Amount" {...field} />
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
          </div>


          <div className="flex flex-col items-end w-full">
            <Button className="w-[100px] rounded-full" variant="default">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
