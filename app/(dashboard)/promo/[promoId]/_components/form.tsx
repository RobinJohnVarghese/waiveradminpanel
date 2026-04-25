"use client";
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import * as z from "zod";
import toast from "react-hot-toast";
import ReactDatePicker from 'react-datepicker';

import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CabRideCostType, Location, ReceiverType, } from "@/lib/types";
import ImageInput from "@/components/custom-component/image-input";
import { formatImageUrl } from "@/utils/helper";
import ValidationErrorMessage from "@/components/custom-component/validation-error-message";


interface Props {
  initialData?: CabRideCostType;
  locations: Location[];
  receiverTypes: ReceiverType[];
}

export const PromoForm = ({ initialData, locations, receiverTypes }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const promptSchema = z.object({
    id: z.string().optional(),
    value: z.coerce.number(),
    usage_limit: z.coerce.number(),
    receiver: z.string(),
    location: z.string(),
    start_time: z.any(),
    end_time: z.any(),
    promo_status: z.string(),
    promo_type: z.string(),
    image: z.any().optional(),
    content: z.string(),
    name: z.string(),
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

  async function onSubmit(data: FormData) {
    setErrorMessage('');
    const formData = new FormData();
    if (data.image instanceof File) {
      formData.append("image", data.image!);
    }
    if (initialData?.id) {
      formData.append("id", initialData.id!);
    }
    formData.append("receiver", data.receiver);
    formData.append("location", data.location);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("promo_status", data.promo_status);
    formData.append("promo_type", data.promo_type);
    formData.append("content", data.content);
    formData.append("name", data.name);
    formData.append("value", String(data.value));
    formData.append("usage_limit", String(data.usage_limit));
    if (initialData?.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/promo/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/promo");
          router.refresh();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.error);
            toast.error(error.response.data.message || "failed");
          } else {
            toast.error("failed");
          }
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/promo/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/promo");
          router.refresh();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.error);
            toast.error(error.response.data.message || "failed");
          } else {
            toast.error("failed");
          }
        });
    }
  }

  console.log('errors', ((watch('image') instanceof File) && URL.createObjectURL((watch('image')) as any)) ||
    (watch(`image`) &&
      formatImageUrl(watch(`image`))) ||
    null
  );


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Promo Name</FormLabel>
                <Input placeholder="Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Promo Description</FormLabel>
                <Input placeholder="Description" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promo_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promo Type</FormLabel>
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
                    <SelectItem value="AMT">Amount</SelectItem>
                    <SelectItem value="PRT">Percent</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Promo Value</FormLabel>
                <Input type="number" placeholder="Value" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usage_limit"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Usage Limit</FormLabel>
                <Input type="number" placeholder="Usage Limit" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send To</FormLabel>
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
                    {receiverTypes &&
                      receiverTypes.length > 0 &&
                      receiverTypes.map((item) => (
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
            name="start_time"
            render={({ field: { onChange, value, ...fields } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date & Time</FormLabel>
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
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd'T'HH:mm:ssXXX"
                  isClearable
                  minDate={new Date()}
                  className="w-full rounded-md"
                  customInput={<Input placeholder="Select date & time" {...fields} value={dayjs(value).format('DD-MM-YYYY HH:mm')} />}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field: { onChange, value, ...fields } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expire Date & Time</FormLabel>
                <ReactDatePicker
                  selected={watch('end_time') ? new Date(watch('end_time')) : null} // Ensure it's a Date
                  onChange={(date: Date | null) => {
                    if (date && date instanceof Date && !isNaN(date.getTime())) {
                      setValue('end_time', date.toISOString());
                    } else {
                      console.error("Invalid date selected");
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd'T'HH:mm:ssXXX" // ISO 8601 format
                  isClearable
                  className="w-full rounded-md"
                  minDate={new Date()}
                  customInput={<Input placeholder="Select date & time" {...fields} value={dayjs(value).format('DD-MM-YYYY HH:mm')} />}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="promo_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promo status</FormLabel>
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

        <ValidationErrorMessage errorMessages={errorMessage} />
        <div className="flex flex-col items-end w-full">
          <Button className="w-[100px] rounded-full" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
