"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  vehicleId: string;
}

export const CreateVehicleDriver = ({ vehicleId, userId }: Props) => {
  const session = useSession();
  const router = useRouter();
  const promptSchema = z.object({
    id: z.string().optional(),
    driver_id: z.string(),
    vehicle_id: z.string().optional(),
    name: z.string(),
  });

  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
  });

  async function onSubmit(data: FormData) {
    data.vehicle_id = vehicleId;
    await axios
      .post(
        `${process.env.BACKEND_URL}/api/v1/staff/create-vehicle-driver/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("success");
        router.refresh();
        router.push(`/waiver/fleet/${userId}/vehicles`);
      })
      .catch((error) => {
        toast.error("failed");
        // console.log(error.data);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="driver_id"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Driver ID</FormLabel>
                <Input placeholder="Driver ID" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Driver Name</FormLabel>
                <Input placeholder="Driver Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="default">Save</Button>
      </form>
    </Form>
  );
};
