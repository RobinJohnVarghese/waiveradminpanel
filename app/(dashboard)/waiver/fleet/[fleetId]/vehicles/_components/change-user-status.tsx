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
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

interface Props {
  id: string;
  row: any;
  status: string;
  name: string;
}

export const ChangeUserStatus = ({ row, id, status, name }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const promptSchema = z.object({
    status: z.string(),
    id: z.string().optional(),
  });
  const defaultValues = { status: status, };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    data.id = id;

    formData.append("id", id);
    formData.append("status", data.status);
    formData.append("user_id", row.original.user);
    formData.append("name", row.original.name);
    formData.append("brand", row.original.brand);
    formData.append("registration_number", row.original.registration_number);
    formData.append("vehicle_type", row.original.vehicle_type);
    formData.append("transmission_type", row.original.transmission_type);
    formData.append("insurance_end_date", row.original.insurance_end_date);
    formData.append("permit_end_date", row.original.permit_end_date);

    await axios.put(`${process.env.BACKEND_URL}/api/v1/staff/create-vehicle/`, formData, {
      headers: {
        Authorization: `Bearer ${session.data?.accessToken}`,
      },
    }).then((res) => {
      toast.success("success");
      setOpen(false);
      router.refresh();
    }).catch((error) => {
      toast.error("failed");
      setOpen(false);
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Badge
          className={cn('cursor-pointer',
            status == "PDG"
              ? "bg-blue-500"
              : status == "ACE"
                ? "bg-green-500"
                : status == "BCD"
                  ? "bg-red-500"
                  : "bg-orange-400"
          )}
        >
          {status == "PDG"
            ? "Pending"
            : status == "ACE"
              ? "Active"
              : status == "BCD"
                ? "Blocked"
                : "Rejected"}
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Status of {name}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACE">Active</SelectItem>
                      <SelectItem value="PDG">Pending</SelectItem>
                      <SelectItem value="BCD">Blocked</SelectItem>
                      <SelectItem value="RJD">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default">Save</Button>
            <Button variant="outline" type="button" className="ml-4" onClick={() => setOpen(false)}>Cancel</Button>
          </form>
        </Form>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
              type="submit"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Change User Status
              </AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};
