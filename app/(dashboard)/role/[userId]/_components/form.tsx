"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import toast from "react-hot-toast";
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
import { UserDetails } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  initialData: UserDetails;
}

export const NewUserForm = ({ initialData }: Props) => {
  const session = useSession();
  const router = useRouter();
  const promptSchema = z.object({
    id: z.string().optional(),
    fullname: z.string(),
    rolename: z.string().optional(),
    is_admin: z.boolean().optional(),
    is_manager: z.boolean().optional(),
    is_staff: z.boolean().optional(),
    password: z.string().optional(),
    dashboard: z.boolean().default(false).optional(),
    users: z.boolean().default(false).optional(),
    waiver: z.boolean().default(false).optional(),
    booking: z.boolean().default(false).optional(),
    location: z.boolean().default(false).optional(),
    ride_cost: z.boolean().default(false).optional(),
    role: z.boolean().default(false).optional(),
    promo: z.boolean().default(false).optional(),
    report: z.boolean().default(false).optional(),
    subscription: z.boolean().default(false).optional(),
    review: z.boolean().default(false).optional(),
    push_notification: z.boolean().default(false).optional(),
  });

  const defaultValues =
    initialData && initialData.id
      ? {
        ...initialData,
        ...{
          rolename: initialData.is_admin
            ? "ADM"
            : initialData.is_manager
              ? "MNG"
              : "STF",
          dashboard: initialData?.permission.dashboard,
          users: initialData?.permission.users,
          waiver: initialData?.permission.waiver,
          booking: initialData?.permission.booking,
          location: initialData?.permission.location,
          ride_cost: initialData?.permission.ride_cost,
          role: initialData?.permission.role,
          promo: initialData?.permission.promo,
          report: initialData?.permission.report,
          subscription: initialData?.permission.subscription,
          review: initialData?.permission.review,
          push_notification: initialData?.permission.push_notification,
        },
      }
      : {};
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    if (data.rolename === "ADM") {
      data.is_admin = true;
      data.is_manager = false;
      data.is_staff = true;
    } else if (data.rolename === "MNG") {
      data.is_admin = false;
      data.is_manager = true;
      data.is_staff = true;
    } else {
      data.is_admin = false;
      data.is_manager = false;
      data.is_staff = true;
    }
    if (initialData && initialData.id) {
      await axios
        .put(
          `${process.env.BACKEND_URL}/api/v1/staff/internal-user-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.replace("/role");
          router.refresh();
        })
        .catch((error) => {
          // console.log(error.data);
          toast.error("failed")
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/internal-user-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("success")
          router.replace("/role");
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
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>User Name </FormLabel>
                <Input placeholder="Full Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rolename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
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
                    <SelectItem value="ADM">Admin</SelectItem>
                    <SelectItem value="MNG">Manager</SelectItem>
                    <SelectItem value="STF">Staff</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {initialData?.id ? null : (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password </FormLabel>
                  <Input placeholder="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="mb-6">
          <h3>Access</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-x-4 p-4 bg-muted border rounded-md">
            <FormField
              control={form.control}
              name="dashboard"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Dashboard</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Users</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waiver"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Waiver</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="booking"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Booking</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Location</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ride_cost"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Ride Cost</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Role Management</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Promo Management</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="report"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Report</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscription"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Subscription</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Review & Rating</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="push_notification"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="self-end text-green-400 bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Push Notification</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button variant="default">Submit</Button>
      </form>
    </Form>
  );
};
