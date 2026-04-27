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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react"; // optional icon library

import { Edit, Pencil, Trash, Wallet } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
}

export const WalletUser = ({ userId }: Props) => {
  const [name, setName] = useState<string>("");
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("today");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const date = new Date();

  const todayDate = date.toISOString().split("T")[0];
  const todayDateStr = date.toDateString();
  date.setDate(date.getDate() - 7);
  const sevenDaysBeforeDate = date.toISOString().split("T")[0];
  const sevenDaysBeforeDateStr = date.toDateString();

  // async function deleteUser() {
  //   const response = await axios({
  //     url: `${process.env.BACKEND_URL}/api/v1/home/earnings-stat/`,
  //     method: "GET",
  //     data: { user_id: userId },
  //     params: {
  //       start_date: today,
  //       end_date: today,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${session.data?.accessToken}`,
  //     },
  //   })
  //     .then((result) => {
  //       console.log(result);

  //       toast.success("success");
  //       router.refresh();
  //       return true;
  //     })
  //     .catch((err) => {
  //       toast.error("failed");
  //     });
  //   // return true;
  // }
  // deleteUser();

  interface Data {
    earnings: {
      ride_fare: number;
      incentives: number;
      referrals: number;
      total: number;
      earnings_by_day: any;
      total_balance: number;
    };
    payout_schedule: any;
    rides: {
      total_rides: number;
      total_distance: number;
      total_duration: number;
    };
  }

  // interface Earnings {
  //      ride_fare: number
  //     incentives: number
  //     referrals: number
  //     total: number
  //     earnings_by_day: Array
  //     total_balance: number

  // }

  const [data, setData] = useState<Data>();

  function rupeeStr(value: any) {
    return value !== 0 ? `₹ ${value}` : `₹ 0.0`;
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    async function deleteUser() {
      setLoading(true);
      const response = await axios({
        url: `${process.env.BACKEND_URL}/api/v1/home/earnings-stat/${userId}`,
        method: "GET",
        // data: { user_id: userId },
        params: {
          start_date: activeTab === "weekly" ? sevenDaysBeforeDate : todayDate,
          end_date: todayDate,
        },
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      });
      //   .then((result) => {
      //     console.log(result);

      //     toast.success("success");
      //     router.refresh();
      //     return true;
      //   })
      //   .catch((err) => {
      //     toast.error("failed");
      //   });
      // // return true;
      console.log(response.data.data);

      setData(response.data.data);
      setLoading(false);
    }
    deleteUser();
  }, [open, activeTab]);

  const convertSeconds = (seconds: any) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          {" "}
          <Wallet className="h-5 w-5 text-blue-400" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle className="text-2xl">Earnings</AlertDialogTitle>
        </AlertDialogHeader>

        <div className=" bg-gray-50 flex flex-col items-center p-4">
          {/* Tabs */}
          <div className="w-full max-w-md flex justify-center space-x-3 mb-5">
            <button
              onClick={() => setActiveTab("today")}
              className={`w-1/2 py-2 rounded-full text-center font-medium ${
                activeTab === "today"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-600 text-blue-600"
              }`}
            >
              TODAY
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`w-1/2 py-2 rounded-full text-center font-medium ${
                activeTab === "weekly"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-600 text-blue-600"
              }`}
            >
              WEEKLY
            </button>
          </div>

          {/* Earnings Card */}
          {loading ? (
            <div>loading </div>
          ) : (
            <div className="w-full max-w-md bg-white shadow rounded-2xl p-5">
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  {activeTab === "today"
                    ? todayDateStr
                    : `${sevenDaysBeforeDateStr} to ${todayDateStr}`}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {rupeeStr(data?.earnings.total)}
                </h2>
              </div>

              {/* Stats Row */}
              <div className="flex justify-between mt-5 mx-5 text-center">
                <div>
                  <div className="bg-blue-50 rounded-full p-3 mx-auto w-15 h-15 flex items-center justify-center">
                    🚗
                  </div>
                  <p className="font-semibold mt-2 text-md">
                    {/* {data?.rides?.total_rides} */}
                    {`${data?.rides?.total_rides}.0`}
                  </p>
                  <p className="text-gray-500 text-xs">Trips</p>
                </div>
                <div>
                  <div className="bg-blue-50 rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center">
                    ⏱️
                  </div>
                  <p className="font-semibold mt-2 text-md">
                    {convertSeconds(data?.rides.total_duration)}
                  </p>
                  <p className="text-gray-500 text-xs">Online Hours</p>
                </div>
                <div>
                  <div className="bg-blue-50 rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center">
                    📍
                  </div>
                  <p className="font-semibold mt-2 text-md">{`${data?.rides.total_distance} Km`}</p>
                  <p className="text-gray-500 text-xs">Distance</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="mt-6 border-t pt-3">
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="flex justify-between items-center w-full text-sm font-semibold"
                >
                  <span>Details</span>
                  {detailsOpen ? (
                    <ChevronUp size={18} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-600" />
                  )}
                </button>

                {/* Collapsible content */}
                {detailsOpen && (
                  <div className="mt-3 text-sm animate-fadeIn mr-4">
                    <p className="flex justify-between mb-1">
                      <span className="text-gray-600">Your earnings</span>
                      <span>{rupeeStr(data?.earnings?.ride_fare)}</span>
                    </p>
                    <p className="flex justify-between mb-1">
                      <span className="text-gray-600">Incentives</span>
                      <span>{`- ₹ ${data?.earnings?.incentives}.0`}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Refer Earnings</span>
                      <span>{`₹ ${data?.earnings?.referrals}.0`}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div className="mt-3 border-t pt-3 text-sm flex justify-between font-medium mr-4">
                <span>Payment</span>
                <span>{rupeeStr(data?.earnings?.total)}</span>
              </div>
            </div>
          )}

          {/* Balance Amount */}
          {loading ? (
            <div></div>
          ) : (
            <div className="w-full max-w-md bg-white shadow rounded-2xl p-5 mt-4">
              <p className="text-gray-600 text-sm">Balance Amount</p>
              <h2 className="text-2xl font-bold mt-1">
                {rupeeStr(data?.earnings?.total_balance)}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {data?.payout_schedule?.date
                  ? data?.payout_schedule?.date
                  : null}
              </p>
              <div className="text-right">
                <button
                  className={` bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-md ml-auto h-10 text-white ${
                    !data?.earnings?.total_balance
                      ? "bg-blue-300"
                      : "bg-orange-600"
                  }`}
                >
                  {!data?.earnings?.total_balance ? "No Amount Due" : "Pay Now"}
                </button>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
