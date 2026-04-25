"use client";
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import ReactDatePicker from 'react-datepicker';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "@/components/custom-component/image-input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";

import { CabRideCostType, Location, ReceiverType, } from "@/lib/types";
import { formatImageUrl } from "@/utils/helper";
import dayjs from 'dayjs';


interface Props {
  initialData?: CabRideCostType;
  locations: Location[];
  receiverTypes: ReceiverType[];
}

export const NotificationForm = ({
  initialData,
  locations,
  receiverTypes,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptSchema = z.object({
    id: z.string().optional(),
    receiver: z.string(),
    location: z.string(),
    send_time: z.string(),
    notification_status: z.string(),
    image: z.any().optional(),
    content: z.string(),
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
  const { setValue, watch, formState: { errors }, } = form

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const formData = new FormData();
    if (!initialData?.image) {
      formData.append("image", data.image);
    }
    if (initialData?.id) {
      formData.append("id", initialData.id!);
    }
    formData.append("receiver", data.receiver);
    formData.append("location", data.location);
    formData.append("send_time", data.send_time);
    formData.append("notification_status", data.notification_status);
    formData.append("content", data.content);
    if (initialData?.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/push-notification/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/notification");
          router.refresh();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("failed")
          console.log(error.data);
          setIsLoading(false);
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/push-notification/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/notification");
          router.refresh();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("failed")
          console.log(error.data);
          setIsLoading(false);
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
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
            name="send_time"
            render={({ field: { onChange, value, ...fields } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date & Time</FormLabel>
                <ReactDatePicker
                  selected={watch('send_time') ? new Date(watch('send_time')) : null} 
                  onChange={(date: Date | null) => {
                    if (date && date instanceof Date && !isNaN(date.getTime())) {
                      setValue('send_time', date.toISOString());
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
            name="notification_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification status</FormLabel>
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
        </div>
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
          {/* {!initialData?.image ? (
            <>
              <Label
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "cursor-pointer h-[100px] w-[100px]"
                )}
                htmlFor="upload"
              >
                <div className="flex flex-row items-center space-x-4">
                  <PlusIcon />
                </div>
              </Label>
              <input
                onChange={(e) =>
                  setSelectedImage(
                    e.target.files ? e.target.files[0] : undefined
                  )
                }
                className="hidden"
                id="upload"
                type="file"
              />
            </>
          ) : (
            <ImageWidget
              value={`${process.env.BACKEND_URL}/${initialData?.image}` || ""}
              id={initialData.id}
            />
          )} */}
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Push Message</FormLabel>
              <Textarea
                placeholder="Push Message"
                {...field}
                className="h-20"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-end w-full">
          <Button className="w-[100px] rounded-full" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
