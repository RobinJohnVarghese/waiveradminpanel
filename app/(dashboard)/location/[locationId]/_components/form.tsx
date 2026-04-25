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
import { Pencil, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location } from "@/lib/types";
import toast from "react-hot-toast";

interface Props {
  initialData?: Location;
}

export const LocationForm = ({ initialData }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const promptSchema = z.object({
    name: z.string(),
    id: z.any().optional(),
    location_type: z.string(),
    status: z.string(),
    radius: z.coerce.number(),
  });
  const defaultValues = {
    ...initialData,
  };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    if (initialData?.id) {
        await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/location-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.push("/location")
          router.refresh();
        })
        .catch((error) => {
          console.log(error.data);
          toast.error("failed")
        });
    } else {


    await axios
      .post(
        `${process.env.BACKEND_URL}/api/v1/staff/location-management/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("success")
        router.push("/location")
        router.refresh();
      })
      .catch((error) => {
        console.log(error.data);

      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Location Name</FormLabel>
                <Input placeholder="Location Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Type</FormLabel>
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
                    <SelectItem value="PMN">Promotion</SelectItem>
                    <SelectItem value="SRE">Service Area</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
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
          <FormField
            control={form.control}
            name="radius"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Radius</FormLabel>
                <Input placeholder="Radius" {...field} />
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
