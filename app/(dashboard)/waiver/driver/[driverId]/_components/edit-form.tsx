"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BankType,
  DistrictType,
  StateType,
  TransmissionType,
  UserDetails,
  VehicleType,
} from "@/lib/types";
import { Location as LocationType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import ImageInput from "@/components/custom-component/image-input";
import { formatImageUrl } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import ValidationErrorMessage from "@/components/custom-component/validation-error-message";

interface Props {
  initialData?: any;
  locations: LocationType[];
  states: StateType[];
  districts: DistrictType[];
  banks: BankType[];
  vehicleTypes: VehicleType[];
  transmissionTypes: TransmissionType[];
}

export const EditDetails = ({
  initialData,
  locations,
  states,
  districts,
  banks,
  transmissionTypes,
  vehicleTypes,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  const transmissionTypeInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [transmissionTypeCommandOpen, setTransmissionTypeCommandOpen] =
    useState(false);
  const [inputValue, setInputValue] = useState("");
  const [transmissionTypeInputValue, setTransmissionTypeInputValue] =
    useState("");
  const [stateId, setStateId] = useState(
    initialData ? initialData.state : states.length > 0 ? states[0].id : 1
  );
  const [errorMessages, setErrorMessages] = useState<any>("");
  const [selectedTransmissionType, setSelectedTransmissionType] = useState<
    any[]
  >(initialData?.transmission_type ? initialData?.transmission_type : []);
  const [selected, setSelected] = useState<VehicleType[]>(
    initialData?.vehicle_type ? initialData?.vehicle_type : []
  );

  const promptSchema = z.object({
    fullname: z.string(),
    id: z.string().optional(),
    unique_id: z.string().optional(),
    email: z.string().email(),
    gender: z.string(),
    dob: z.string(),
    phone: z.string(),
    alternative_phone: z.string(),
    whatsapp_phone: z.string(),
    state: z.any().optional(),
    district: z.string(),
    work_location: z.string(),
    address: z.string(),
    bank: z.string(),
    holder_name: z.string(),
    account_number: z.string(),
    ifsc: z.string(),
    profile_image: z.any().optional(),
    aadhar_image_1: z.any().optional(),
    aadhar_image_2: z.any().optional(),
    driving_license_1: z.any().optional(),
    driving_license_2: z.any().optional(),
    pan_card_1: z.any().optional(),
    pan_card_2: z.any().optional(),
    certificate_1: z.any().optional(),
    certificate_2: z.any().optional(),
  });
  const defaultValues = initialData
    ? {
        ...initialData,
        ...{
          state: String(initialData?.state),
          district: String(initialData?.district),
          work_location: String(initialData?.work_location),
          bank: String(initialData?.bank_details?.bank),
          holder_name: initialData?.bank_details?.holder_name,
          account_number: initialData?.bank_details?.account_number,
          ifsc: initialData?.bank_details?.ifsc,
        },
      }
    : {};
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  async function onSubmit(data: FormData) {
    setDisabled(true);
    data.state = stateId;
    const formData = new FormData();
    if (initialData && initialData.id) {
      formData.append("id", initialData.id);
      formData.append("user", initialData.user);
      formData.append("bank_id", initialData.bank_details.id);
    }
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("phone", data.phone);
    formData.append("vehicle_types", selected.map((item) => item.id).join(","));
    formData.append(
      "transmission_type",
      selectedTransmissionType.map((item) => item.id).join(",")
    );
    formData.append("alternative_phone", data.alternative_phone);
    formData.append("whatsapp_phone", data.whatsapp_phone);
    formData.append("state", data.state);
    formData.append("district", data.district);
    formData.append("work_location", data.work_location);
    formData.append("address", data.address);
    if (data.profile_image instanceof File) {
      formData.append("profile_image", data.profile_image!);
    }
    if (data.aadhar_image_1 instanceof File) {
      formData.append("aadhar_image_1", data.aadhar_image_1!);
    }
    if (data.aadhar_image_2 instanceof File) {
      formData.append("aadhar_image_2", data.aadhar_image_2!);
    }
    if (data.driving_license_1 instanceof File)
      formData.append("driving_license_1", data.driving_license_1!);
    if (data.driving_license_2 instanceof File) {
      formData.append("driving_license_2", data.driving_license_2!);
    }
    if (data.pan_card_1 instanceof File) {
      formData.append("pan_card_1", data.pan_card_1!);
    }
    if (data.pan_card_2 instanceof File) {
      formData.append("pan_card_2", data.pan_card_2!);
    }
    if (data.certificate_1 instanceof File) {
      formData.append("certificate_1", data.certificate_1!);
    }
    if (data.certificate_2 instanceof File) {
      formData.append("certificate_2", data.certificate_2!);
    }
    formData.append("bank", data.bank);
    formData.append("holder_name", data.holder_name);
    formData.append("account_number", data.account_number);
    formData.append("ifsc", data.ifsc);
    // console.log(data);

    if (initialData && initialData.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/create-driver-profile/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success");
          setDisabled(false);
          router.refresh();
        })
        .catch((error) => {
          console.log("error", error);

          setErrorMessages(error);
          toast.error("failed");
          // console.log(error.data);
          setDisabled(false);
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/create-driver-profile/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setDisabled(false);
          toast.success("success");
          router.refresh();
          router.push("/waiver/driver");
        })
        .catch((error) => {
          // console.log(error.data);
          toast.error("failed");
          setDisabled(false);
        });
    }
  }

  const handleUnselect = useCallback((vehicle: VehicleType) => {
    setSelected((prev) => prev.filter((s) => s.id !== vehicle.id));
  }, []);
  const handleTransmissionTypeUnselect = useCallback(
    (transmissionType: any) => {
      setSelectedTransmissionType((prev) =>
        prev.filter((s) => s.id !== transmissionType.id)
      );
    },
    []
  );

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
  const handleKeyDownTransmissionType = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = transmissionTypeInputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedTransmissionType((prev) => {
              const newSelectedTransmissionType = [...prev];
              newSelectedTransmissionType.pop();
              return newSelectedTransmissionType;
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

  const selectables = vehicleTypes?.filter(
    (vehicle) => !selected.includes(vehicle)
  );
  const transmissionTypeSelectables = transmissionTypes?.filter(
    (transmissionType) => !selectedTransmissionType.includes(transmissionType)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="full name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="unique_id"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Driver ID</FormLabel>
                <Input placeholder="driver id" {...field} />
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email Address</FormLabel>
                <Input placeholder="email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
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
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]} // Format to 'YYYY-MM-DD'
                  placeholder="date of birth"
                  {...field}
                  value={watch("dob") ? watch("dob").split("T")[0] : ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="phone number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternative_phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Alternate Phone Number</FormLabel>
                <Input placeholder="phone number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp_phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Whatsapp Phone Number</FormLabel>
                <Input type="number" placeholder="phone number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select State</FormLabel>
                <Select
                  onValueChange={(value) => setStateId(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states &&
                      states.length > 0 &&
                      states.map((item) => (
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
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select District</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts &&
                      districts.length > 0 &&
                      districts
                        .filter((item) => item.state == stateId)
                        .map((item) => (
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
            name="work_location"
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
          <div>
            <FormLabel>Familiar Transmission Type</FormLabel>
            <Command
              onKeyDown={handleKeyDownTransmissionType}
              className="overflow-visible bg-transparent"
            >
              <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                  {selectedTransmissionType.map((vehicle) => {
                    return (
                      <Badge key={vehicle.id} variant="secondary">
                        {vehicle.name}
                        <button
                          className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleTransmissionTypeUnselect(vehicle);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={() =>
                            handleTransmissionTypeUnselect(vehicle)
                          }
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                      </Badge>
                    );
                  })}
                  {/* Avoid having the "Search" Icon */}
                  <CommandPrimitive.Input
                    ref={transmissionTypeInputRef}
                    value={transmissionTypeInputValue}
                    onValueChange={setTransmissionTypeInputValue}
                    onBlur={() => setTransmissionTypeCommandOpen(false)}
                    onFocus={() => setTransmissionTypeCommandOpen(true)}
                    placeholder="Select vehicle types..."
                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                  />
                </div>
              </div>
              <div className="relative mt-2">
                {transmissionTypeCommandOpen &&
                transmissionTypeSelectables &&
                transmissionTypeSelectables?.length > 0 ? (
                  <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandGroup className="h-full overflow-auto">
                      {transmissionTypeSelectables.map((transmissionType) => {
                        return (
                          <CommandItem
                            key={transmissionType.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={(value) => {
                              setTransmissionTypeInputValue("");
                              setSelectedTransmissionType((prev) => [
                                ...prev,
                                transmissionType,
                              ]);
                            }}
                            className={"cursor-pointer"}
                          >
                            {transmissionType.name}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </div>
                ) : null}
              </div>
            </Command>
          </div>
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Address</FormLabel>
              <Textarea placeholder="address" {...field} className="h-20" />
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="text-xl">Document Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="my-4 ">
            <ImageInput
              label="Profile Image"
              name={`profile_image`}
              src={
                (watch("profile_image") instanceof File &&
                  URL.createObjectURL(watch("profile_image") as any)) ||
                (watch(`profile_image`) &&
                  formatImageUrl(watch(`profile_image`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`profile_image`, event.target.files[0]);
              }}
              errorMessage={errors?.profile_image?.message as string}
            />
          </div>
          <div className="my-4 flex flex-col space-y-2">
            <ImageInput
              label="Aadhar Card"
              name={`aadhar_image_1`}
              src={
                (watch("aadhar_image_1") instanceof File &&
                  URL.createObjectURL(watch("aadhar_image_1") as any)) ||
                (watch(`aadhar_image_1`) &&
                  formatImageUrl(watch(`aadhar_image_1`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`aadhar_image_1`, event.target.files[0]);
              }}
              errorMessage={errors?.aadhar_image_1?.message as string}
            />
          </div>
          <div className="my-4 flex flex-col space-y-2">
            <ImageInput
              label="Aadhar Card Back"
              name={`aadhar_image_2`}
              src={
                (watch("aadhar_image_2") instanceof File &&
                  URL.createObjectURL(watch("aadhar_image_2") as any)) ||
                (watch(`aadhar_image_2`) &&
                  formatImageUrl(watch(`aadhar_image_2`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`aadhar_image_2`, event.target.files[0]);
              }}
              errorMessage={errors?.aadhar_image_2?.message as string}
            />
          </div>
          <div className="w-full  my-4 gap-2">
            <ImageInput
              label="Driving License 1"
              name={`driving_license_1`}
              src={
                (watch("driving_license_1") instanceof File &&
                  URL.createObjectURL(watch("driving_license_1") as any)) ||
                (watch(`driving_license_1`) &&
                  formatImageUrl(watch(`driving_license_1`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`driving_license_1`, event.target.files[0]);
              }}
              errorMessage={errors?.driving_license_1?.message as string}
            />
          </div>
          <div className="w-full  my-4 gap-2">
            <ImageInput
              label="Driving License 2"
              name={`driving_license_2`}
              src={
                (watch("driving_license_2") instanceof File &&
                  URL.createObjectURL(watch("driving_license_2") as any)) ||
                (watch(`driving_license_2`) &&
                  formatImageUrl(watch(`driving_license_2`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`driving_license_2`, event.target.files[0]);
              }}
              errorMessage={errors?.driving_license_2?.message as string}
            />
          </div>
          <div className="w-full  my-4 gap-2">
            <ImageInput
              label="PAN Card 1"
              name={`pan_card_1`}
              src={
                (watch("pan_card_1") instanceof File &&
                  URL.createObjectURL(watch("pan_card_1") as any)) ||
                (watch(`pan_card_1`) && formatImageUrl(watch(`pan_card_1`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`pan_card_1`, event.target.files[0]);
              }}
              errorMessage={errors?.pan_card_1?.message as string}
            />
          </div>
          <div className="w-full  my-4 gap-2">
            <ImageInput
              label="PAN Card 2"
              name={`pan_card_2`}
              src={
                (watch("pan_card_2") instanceof File &&
                  URL.createObjectURL(watch("pan_card_2") as any)) ||
                (watch(`pan_card_2`) && formatImageUrl(watch(`pan_card_2`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`pan_card_2`, event.target.files[0]);
              }}
              errorMessage={errors?.pan_card_2?.message as string}
            />
          </div>
          <div className="w-full my-4 gap-2">
            <ImageInput
              label="Police Clearance Certificate"
              name={`certificate_1`}
              src={
                (watch("certificate_1") instanceof File &&
                  URL.createObjectURL(watch("certificate_1") as any)) ||
                (watch(`certificate_1`) &&
                  formatImageUrl(watch(`certificate_1`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`certificate_1`, event.target.files[0]);
              }}
              errorMessage={errors?.certificate_1?.message as string}
            />
          </div>
          <div className="w-full my-4 gap-2">
            <ImageInput
              label="Police Clearance Certificate 2"
              name={`certificate_1`}
              src={
                (watch("certificate_2") instanceof File &&
                  URL.createObjectURL(watch("certificate_2") as any)) ||
                (watch(`certificate_2`) &&
                  formatImageUrl(watch(`certificate_2`))) ||
                null
              }
              onChange={(event: any) => {
                setValue(`certificate_2`, event.target.files[0]);
              }}
              errorMessage={errors?.certificate_2?.message as string}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl">Document Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
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
                      {banks &&
                        banks.length > 0 &&
                        banks.map((item) => (
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
              name="holder_name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Account Holder Name</FormLabel>
                  <Input placeholder="Account Holder Name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Account Number</FormLabel>
                  <Input placeholder="Account Number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>IFSC</FormLabel>
                  <Input placeholder="IFSC" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <ValidationErrorMessage errorMessages={errorMessages} />
          <Button variant="default" disabled={disabled}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
