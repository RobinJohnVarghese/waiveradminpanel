"use client";
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OptionType, VehicleType } from "@/lib/types";
import dayjs from 'dayjs';

interface Props {
  initialData?: any;
  options: OptionType[];
  vehicleTypes: VehicleType[];
}

export const EditDetails = ({ initialData, options, vehicleTypes }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const promptSchema = z.object({
    id: z.string().optional(),
    ride_type: z.string(),
    phone: z.string(),
    ride_option_type: z.string(),
    vehicle_name: z.string().optional(),
    registration_number: z.string().optional(),
    vehicle_type: z.string().optional(),
    fullname: z.string().optional(),
    email: z.string().email().optional(),
    start_time: z.string(),
    start_location: z.string(),
    end_location: z.string(),
  });
  const defaultValues = initialData
    ? {
      ...initialData,
      ...{
        ride_type: String(initialData.ride_type),
        ride_option_type: String(initialData.ride_option_type),
      },
    }
    : { start_time: new Date() };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });
  const { setValue, watch, formState: { errors }, } = form

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    if (initialData && initialData.id) {
      await axios
        .put(`${process.env.BACKEND_URL}/api/v1/staff/booking/`, data, {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          toast.success("Booking details edited")
          router.refresh();
          router.push(`/bookings`);
        })
        .catch((error) => {
          console.log(error.data);
          toast.error("failed")
          setIsLoading(false);
        });
    } else {
      await axios.post(`${process.env.BACKEND_URL}/api/v1/staff/booking/`, data, {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      }).then((res) => {
        setIsLoading(false);
        toast.success("Booking added")
        router.refresh();
        router.push(`/bookings/${res.data.data.id}`);
      }).catch((error) => {
        console.log(error.data);
        toast.error("Failed")
        setIsLoading(false);
      });
    }
  }

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="ride_option_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ride Option Type</FormLabel>
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
                        {options &&
                          options.length > 0 &&
                          options.map((item) => (
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="number" placeholder="phone number" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ride_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ride Type</FormLabel>
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
                        <SelectItem value="RND">Round Trip</SelectItem>
                        <SelectItem value="ONE">One Way Trip</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicle_name"
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
                name="registration_number"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Registration Number</FormLabel>
                    <Input placeholder="Registration Number" {...field} />
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
                name="fullname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>User Name</FormLabel>
                    <Input placeholder="User Name" {...field} />
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
                name="start_time"
                render={({ field: { onChange, value, ...fields } }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Pickup Date & Time</FormLabel>
                    <ReactDatePicker
                      selected={watch('start_time') ? new Date(watch('start_time')) : null}
                      onChange={(date: Date | null) => {
                        if (date && date instanceof Date && !isNaN(date.getTime())) {
                          console.log('date', watch('start_time'));

                          setValue('start_time', date.toISOString());
                        } else {
                          console.error("Invalid date selected");
                        }
                      }}
                      // disabled={!initialData}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ssXXX"
                      isClearable
                      minDate={new Date()}
                      className="w-full rounded-md"
                      customInput={<Input placeholder="Pickup date & time" {...fields} value={dayjs(value).format('DD-MM-YYYY HH:mm')} disabled={!initialData} />}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_location"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Pickup Location</FormLabel>
                    <Input placeholder="Pickup Location" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_location"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Destination Location</FormLabel>
                    <Input placeholder="Destination Location" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!initialData?.id &&
              <div className="flex justify-end">
                <Button variant="default" disabled={isLoading} >Save</Button>
              </div>
            }
          </form>
        </Form>
      </>
    );
  }
};
