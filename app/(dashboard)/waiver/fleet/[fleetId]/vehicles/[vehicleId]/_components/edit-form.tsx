"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, PlusIcon, Trash } from "lucide-react";
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
  WorkExperience,
} from "@/lib/types";
import { Location as LocationType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageWidget from "./image-widget";
import toast from "react-hot-toast";
import ValidationErrorMessage from "@/components/custom-component/validation-error-message";

interface Props {
  initialData?: any;
  vehicleTypes: VehicleType[];
  transmissionTypes: TransmissionType[];
  userId: string;
}

export const EditDetails = ({
  initialData,
  vehicleTypes,
  transmissionTypes,
  userId,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptSchema = z.object({
    id: z.string().optional(),
    registration_number: z.string(),
    name: z.string(),
    brand: z.string(),
    transmission_type: z.string(),
    vehicle_type: z.string(),
    permit_end_date: z.string(),
    insurance_end_date: z.string(),
  });
  const defaultValues = initialData
    ? {
      ...initialData,
      ...{
        vehicle_type: String(initialData.vehicle_type),
        transmission_type: String(initialData.transmission_type),
      },
    }
    : {};
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    setErrorMessages('');
    setIsLoading(true);
    const formData = new FormData();
    if (initialData && initialData.id) {
      formData.append("id", initialData.id);
    }
    formData.append("user_id", userId);
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("registration_number", data.registration_number);
    formData.append("vehicle_type", data.vehicle_type);
    formData.append("transmission_type", data.transmission_type);
    formData.append("insurance_end_date", data.insurance_end_date);
    formData.append("permit_end_date", data.permit_end_date);
    if (selectedRC1) formData.append("rc_1", selectedRC1!);
    if (selectedRC2) formData.append("rc_2", selectedRC2!);
    if (selectedInsurance)
      formData.append("insurance", selectedInsurance!);
    if (selectedPermit)
      formData.append("permit", selectedPermit!);

    // console.log(data);

    if (initialData && initialData.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/create-vehicle/`, formData, {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setOpen(false);
          toast.success("success")
          router.refresh();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("failed")
          // console.log(error.data);
          setOpen(false);
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/create-vehicle/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          setOpen(false);
          toast.success("success")
          router.refresh();
          router.push(`/waiver/fleet/${userId}/vehicles`);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.data) {
            setErrorMessages(error.response.data.error);
            toast.error(error.response.data.message || "failed");
          }
          toast.error("failed");
        });
    }
  }

  const [selectedRC1, setSelectedRC1] = useState<Blob>();
  const [selectedRC2, setSelectedRC2] = useState<Blob>();
  const [selectedInsurance, setSelectedInsurance] = useState<Blob>();
  const [selectedPermit, setSelectedPermit] = useState<Blob>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="registration_number"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Vehicle Registration Number</FormLabel>
                <Input placeholder="Vehicle Registration Number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Vehicle Brand</FormLabel>
                <Input placeholder="Vehicle Brand" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Vehicle Name</FormLabel>
                <Input placeholder="Vehicle Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
          <FormField
            control={form.control}
            name="transmission_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Familiar Transmission Type</FormLabel>
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
                    {transmissionTypes &&
                      transmissionTypes.length > 0 &&
                      transmissionTypes.map((item) => (
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
            name="permit_end_date"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Permit End Date</FormLabel>
                <Input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="Permit validity date"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insurance_end_date"
            render={({ field }) => {
              const formattedValue = field.value ? field.value.split('T')[0] : '';
              return (
                <FormItem className="mb-4">
                  <FormLabel>Insurance validity date</FormLabel>
                  <Input
                    type="date"
                    {...field}
                    value={formattedValue}
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div>
          <h3 className="text-xl">Document Details</h3>

          <div className="grid grid-cols-2 gap-4 w-fit">
            <div className="my-4 flex flex-col space-y-2">
              <Label>Registration Certificate (RC)</Label>
              <div className="flex flex-row space-x-4">
                {!initialData?.rc_1 ? (
                  <>
                    <Label
                      className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "cursor-pointer h-[200px] w-[200px]"
                      )}
                      htmlFor="rc_1"
                    >
                      <div className="flex flex-row items-center space-x-4">
                        <PlusIcon />
                      </div>
                    </Label>
                    <input
                      onChange={(e) =>
                        setSelectedRC1(
                          e.target.files ? e.target.files[0] : undefined
                        )
                      }
                      className="hidden"
                      id="rc_1"
                      type="file"
                    />
                  </>
                ) : (
                  <ImageWidget
                    vehicleId={initialData.id}
                    value={
                      `${initialData?.rc_1}` ||
                      ""
                    }
                    id={initialData.id}
                    proofType="RJS"
                  />
                )}
                {!initialData?.rc_2 ? (
                  <>
                    <Label
                      className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "cursor-pointer h-[200px] w-[200px]"
                      )}
                      htmlFor="rc_2"
                    >
                      <div className="flex flex-row items-center space-x-4">
                        <PlusIcon />
                      </div>
                    </Label>
                    <input
                      onChange={(e) =>
                        setSelectedRC2(
                          e.target.files ? e.target.files[0] : undefined
                        )
                      }
                      className="hidden"
                      id="rc_2"
                      type="file"
                    />
                  </>
                ) : (
                  <ImageWidget
                    vehicleId={initialData.id}
                    value={
                      `${initialData?.rc_2}` ||
                      ""
                    }
                    id={initialData.id}
                    proofType="RJS"
                  />
                )}
              </div>

            </div>
            <div className="flex flex-row space-x-4">
              <div className="my-4 flex flex-col space-y-2">
                <Label>Vehicle Insurance</Label>
                {!initialData?.insurance ? (
                  <>
                    <Label
                      className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "cursor-pointer h-[200px] w-[200px]"
                      )}
                      htmlFor="insurance"
                    >
                      <div className="flex flex-row items-center space-x-4">
                        <PlusIcon />
                      </div>
                    </Label>
                    <input
                      onChange={(e) =>
                        setSelectedInsurance(
                          e.target.files ? e.target.files[0] : undefined
                        )
                      }
                      className="hidden"
                      id="insurance"
                      type="file"
                    />
                  </>
                ) : (
                  <ImageWidget
                    vehicleId={initialData.id}
                    value={
                      `${initialData?.insurance}` ||
                      ""
                    }
                    id={initialData.id}
                    proofType="VIS"
                  />
                )}
              </div>
              <div className="my-4 flex flex-col space-y-2">
                <Label>Vehicle Permit</Label>
                {!initialData?.permit ? (
                  <>
                    <Label
                      className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "cursor-pointer h-[200px] w-[200px]"
                      )}
                      htmlFor="permit"
                    >
                      <div className="flex flex-row items-center space-x-4">
                        <PlusIcon />
                      </div>
                    </Label>
                    <input
                      onChange={(e) =>
                        setSelectedPermit(
                          e.target.files ? e.target.files[0] : undefined
                        )
                      }
                      className="hidden"
                      id="permit"
                      type="file"
                    />
                  </>
                ) : (
                  <ImageWidget
                    vehicleId={initialData.id}
                    value={
                      `${initialData?.permit}` ||
                      ""
                    }
                    id={initialData.id}
                    proofType="VPS"
                  />
                )}
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <ValidationErrorMessage errorMessages={errorMessages} />
          <Button variant="default" disabled={isLoading} >Save</Button>
        </div>
      </form>
    </Form>
  );
};
