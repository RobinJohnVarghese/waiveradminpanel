"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
  SubscriptionPlanType,
  Location,
  PlanType,
  UserDetails,
  VehicleType,
  PlanService,
} from "@/lib/types";
import toast from "react-hot-toast";

interface Props {
  initialData?: SubscriptionPlanType;
  planTypes: PlanType[];
  planServices: PlanService[];
}

export const SubscriptionForm = ({
  initialData,
  planTypes,
  planServices,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const promptSchema = z.object({
    id: z.string().optional(),
    plan_type: z.string(),
    name: z.string(),
    bookings_no: z.coerce.number(),
    validity_days: z.coerce.number(),
    max_distance_km: z.coerce.number(),
    max_duration_hr: z.coerce.number(),
    price: z.coerce.number(),
    compare_price: z.coerce.number(),
    plan_status: z.string(),
  });

  const defaultValues = {
    ...initialData,
    ...{
      plan_type: String(initialData?.plan_type),
    },
  };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  const [selectedImage, setSelectedImage] = useState<Blob>();

  async function onSubmit(data: FormData) {
    if (initialData?.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/subscription-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.refresh();
        })
        .catch((error) => {
          toast.error("failed")
          // console.log(error.data);
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/subscription-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/subscription");
          router.refresh();
        })
        .catch((error) => {
          toast.error("failed")
          // console.log(error.data);
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Subscription Name</FormLabel>
                <Input placeholder="Subscription Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plan_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
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
                    {planTypes &&
                      planTypes.length > 0 &&
                      planTypes.map((item) => (
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
            name="bookings_no"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Bookings</FormLabel>
                <Input type="number" placeholder="Bookings" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validity_days"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Validity(days)</FormLabel>
                <Input type="number" placeholder="Validity" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_distance_km"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Max Km Per Booking</FormLabel>
                <Input
                  type="number"
                  placeholder="Max Km Per Booking"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_duration_hr"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Max Hrs Per Booking</FormLabel>
                <Input placeholder="Max Hrs Per Booking" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Subscription Price</FormLabel>
                <Input placeholder="Subscription Price" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="compare_price"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Compare at Price</FormLabel>
                <Input placeholder="Compare at Price" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plan_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan status</FormLabel>
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
        <div className="flex flex-row overflow-x-auto space-x-2 px-2 py-1 rounded-md border mb-2">
          {planServices &&
            planServices.length > 0 &&
            planServices.map((item) => (
              <div key={item.id} className="p-2 flex flex-row items-center">
                <Input type="checkbox" className="mr-2 h-4 w-4" />
                {item.name}{" "}
              </div>
            ))}
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
