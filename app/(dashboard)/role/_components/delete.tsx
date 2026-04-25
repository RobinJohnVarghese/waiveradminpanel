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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
}

export const DeleteUser = ({ userId }: Props) => {
  const [name, setName] = useState<string>("");
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  async function deleteUser() {
    // console.log(JSON.stringify({ user_id: userId }));
    const response = await axios({
      url: `${process.env.BACKEND_URL}/api/v1/staff/delete-user/`,
      method: "PUT",
      data: { user_id: userId },
      headers: {
        Authorization: `Bearer ${session.data?.accessToken}`,
      },
    })
      .then(() => {
        toast.success("success");
        router.refresh();
        return true;
      })
      .catch((err) => {
        toast.error("failed");
      });
    return true;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          {" "}
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (event) => {
              event.preventDefault();
              const deleted = await deleteUser();
              if (deleted) {
                setOpen(false);
                router.refresh();
              }
            }}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Confirm delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
