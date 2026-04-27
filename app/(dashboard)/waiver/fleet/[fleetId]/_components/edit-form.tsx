"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DistrictType, StateType, UserDetails } from "@/lib/types";
import { Location as LocationType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import ValidationErrorMessage from "@/components/custom-component/validation-error-message";

interface Props {
  initialData?: any;
  states: StateType[];
  districts: DistrictType[];
  locations: LocationType[];
}

export const EditDetails = ({
  initialData,
  states,
  districts,
  locations,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>(null);

  const promptSchema = z.object({
    fullname: z.string(),
    id: z.string().optional(),
    email: z.string().email(),
    gender: z.string(),
    dob: z.string(),
    phone: z.string(),
    alternative_phone: z.string(),
    work_location: z.string(),
    whatsapp_phone: z.string(),
    state: z.any().optional(),
    district: z.string(),
    address: z.string(),
  });
  const defaultValues = initialData
    ? {
        ...initialData,
        ...{
          state: String(initialData.state),
          work_location: String(initialData.work_location),
          district: String(initialData.district),
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
    setErrorMessages("");
    data.state = stateId;
    setIsLoading(true);
    if (initialData && initialData.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/create-fleet-profile/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success("success");
          router.push("/waiver/fleet");
          router.refresh();
        })
        .catch((error) => {
          setIsLoading(false);
          // console.log(error.data);
          toast.error("failed");
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/create-fleet-profile/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success("success");
          router.push("/waiver/fleet");
          router.refresh();
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

  const [stateId, setStateId] = useState(
    initialData ? initialData.state : states.length > 0 ? states[0].id : 1
  );

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  console.log("initialData", initialData);

  if (isMounted) {
    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-2">
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email Address</FormLabel>
                    <Input type="email" placeholder="email" {...field} />
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
                      max={new Date().toISOString().split("T")[0]}
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
                    <Input
                      type="number"
                      placeholder="phone number"
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="phone number"
                      {...field}
                    />
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
                    <Input
                      type="number"
                      placeholder="phone number"
                      {...field}
                    />
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
            <div className="flex flex-col gap-2 justify-end">
              <ValidationErrorMessage errorMessages={errorMessages} />
              <Button variant="default" disabled={isLoading}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
  }
};
