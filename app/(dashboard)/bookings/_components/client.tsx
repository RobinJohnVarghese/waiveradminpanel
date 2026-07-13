"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Column, columns } from "./columns";
import { getAllBookings, getBookings, getBookingsAnalytics } from "@/actions/ride-cost";

interface ClientProps {
  fetchType: "ALL" | "ONG" | "PEN" | "SCD" | "CAN";
  showAnalytics?: boolean;
}

export const Client: React.FC<ClientProps> = ({ fetchType, showAnalytics = false }) => {
  const [data, setData] = useState<Column[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        let bookingsData;
        if (fetchType === "ALL") {
          bookingsData = await getAllBookings();
        } else {
          bookingsData = await getBookings(fetchType);
        }
        
        if (bookingsData) {
          setData(bookingsData);
        }

        if (showAnalytics) {
          const analyticsData = await getBookingsAnalytics();
          if (analyticsData) setAnalytics(analyticsData);
        }
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err && (err as any).digest?.startsWith('NEXT_REDIRECT')) {
          throw err;
        }
        console.error("Failed to load bookings", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [fetchType, showAnalytics]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="w-full text-center py-10 text-red-500">Failed to load data. Please refresh.</div>;
  }

  return (
    <>
      <DataTable
        searchKey="passenger_name"
        columns={columns}
        data={data || []}
        analytics={analytics}
      />
    </>
  );
};
