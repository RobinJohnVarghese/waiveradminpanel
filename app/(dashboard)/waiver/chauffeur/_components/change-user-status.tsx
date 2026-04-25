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
import toast from "react-hot-toast";

interface Props {
  profileId: string;
  status: string;
  name: string;
}

export const ChangeUserStatus = ({ profileId, status, name }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const promptSchema = z.object({
    status: z.string(),
    profile_id: z.string().optional(),
  });
  const defaultValues = {
    status: status,
  };
  type FormData = z.infer<typeof promptSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(promptSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    data.profile_id = profileId;
    await axios
      .post(
        `${process.env.BACKEND_URL}/api/v1/staff/change-user-status/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("success")
        setOpen(false);
        router.refresh();
      })
      .catch((error) => {
        toast.error("failed")
        // console.log(error.data);

        setOpen(false);
      });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          {" "}
          <Pencil className="h-4 w-4" />
        </Button>
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
