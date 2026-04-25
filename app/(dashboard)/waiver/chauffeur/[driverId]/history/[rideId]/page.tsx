import { getRideDetails } from "@/actions/ride-cost";
import { Client } from "../_components/client";

interface Props {
  params: { driverId: string; rideId: string };
}

export default async function HistoryPage({ params }: Props) {
  const details = await getRideDetails(params.rideId);
  console.log(details);
  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">Ride Details</h2>
      </div>
      <div className="border rounded-md lg:w-2/3">
        <div className="bg-gray-100 p-2">Details</div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Ride ID</p> : {details.id}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>User Name</p> : {details.passenger_name}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>User ID</p> : {details.passenger}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Driver Name</p> : {details.driver_name}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Driver ID</p> : {details.driver_id}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Fleet Name</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.fleet_name
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Fleet ID</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.fleet_id
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Ride Start Date & Time</p> :{" "}
          {new Date(details.start_time).toLocaleString()}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Ride End Date & Time</p> :{" "}
          {new Date(details.end_time).toLocaleString()}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Pickup Address</p> : {details.start_location}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Destination Address</p> : {details.end_location}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Ride Type</p> : {details.ride_type}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Vehicle Registration Number</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.registration_number
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Vehicle Brand</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.brand
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Vehicle Name</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.name
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Vehicle Type</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.vehicle_type
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Vehicle Transmission Type</p> :{" "}
          {details.vehicle_details
            ? details.vehicle_details.transmission_type
            : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Comment</p> : {details.review ? details.review : "**********"}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Rating</p> : {details.rating}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>P.Type</p> : {details.payment_details.payment_type}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Min Rate</p> : {details.payment_details.fare}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Trip Fare</p> : {details.payment_details.total}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Promo</p> : {details.payment_details.promo}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Tax</p> : {details.payment_details.tax}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>P.Status</p> : {details.payment_details.status}
        </div>
        <div className="border-b p-2 grid grid-cols-2 justify-between">
          <p>Ride Status</p> : {details.ride_status}
        </div>
      </div>
    </div>
  );
}
