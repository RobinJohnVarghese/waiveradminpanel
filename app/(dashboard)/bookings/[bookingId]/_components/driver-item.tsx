"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface Props {
  data: {
    id: string;
    fullname: string;
    phone: string;
    profile_image: string;
  };
  rideId: string;
  driver: string;
}

export const DriverItem = ({ data, rideId, driver }: Props) => {
  const session = useSession();
  const router = useRouter();
  async function onSubmit(e: any) {
    e.preventDefault();
    const formData = { driver: data.id, ride: rideId };
    await axios
      .post(
        `${process.env.BACKEND_URL}/api/v1/staff/add-booking-driver/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Driver added");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Failed");
        console.log(error.data);
      });
  }
  return (
    <div className="border-b flex flex-row justify-between items-center px-4 py-2">
      <div className="p-2 flex flex-row space-x-4">
        <UserAvatar
          user={{
            name: data.fullname || null,
            image: data.profile_image || null,
          }}
          className="h-10 w-10"
        />
        <div className="flex flex-col space-y-1">
          <p className="text-semibold text-lg">{data.fullname}</p>
          <p className="text-md">{data.phone}</p>
        </div>
      </div>
      {data.id === driver ? <Button className="bg-green-400">Assigned</Button> :<Button onClick={onSubmit}>
        Assign
      </Button>
}
    </div>
  );
};
