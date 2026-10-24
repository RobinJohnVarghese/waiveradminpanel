"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Column, columns } from "./columns";
import { getAllBookings, getBookings, getBookingsAnalytics } from "@/actions/ride-cost";

interface ClientProps {
  fetchType: "ALL" | "ONG" | "PEN" | "SCD" | "CAN";
  showAnalytics?: boolean;
  initialData?: Column[];
  initialAnalytics?: any;
}

export const Client: React.FC<ClientProps> = ({
  fetchType,
  showAnalytics = false,
  initialData,
  initialAnalytics,
}) => {
  const [data, setData] = useState<Column[]>(initialData || []);
  const [analytics, setAnalytics] = useState<any>(initialAnalytics || null);
  const [loading, setLoading] = useState(initialData !== undefined ? false : true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialData !== undefined) {
      return;
    }

    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);

        const bookingsPromise = (fetchType === "ALL" ? getAllBookings() : getBookings(fetchType))
          .then((bData) => {
            if (isMounted && bData) setData(bData);
            return bData;
          });

        const analyticsPromise = showAnalytics
          ? getBookingsAnalytics().then((aData) => {
              if (isMounted && aData) setAnalytics(aData);
              return aData;
            })
          : Promise.resolve(null);

        await Promise.all([bookingsPromise, analyticsPromise]);
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err && (err as any).digest?.startsWith('NEXT_REDIRECT')) {
          throw err;
        }
        console.error("Failed to load bookings", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [fetchType, showAnalytics, initialData]);

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
