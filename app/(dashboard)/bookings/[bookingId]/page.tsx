import { getUserDetails } from "@/actions/get-users";
import { EditDetails } from "./_components/edit-form";
import { OptionType, VehicleType } from "@/lib/types";
import {
  getBookingDetails,
  getBookingPayment,
  getDriversForBooking,
  getRideOptions,
  getVehicleTypes,
} from "@/actions/ride-cost";
import { DriverItem } from "./_components/driver-item";

interface Props {
  params: { bookingId: string };
}

export default async function DetailsPage({ params }: Props) {
  const edit = params.bookingId !== "new";
  let booking: any;
  let drivers;
  let payment;
  if (edit) {
    booking = await getBookingDetails(params.bookingId);
    drivers = await getDriversForBooking(params.bookingId);
    payment = await getBookingPayment(params.bookingId);
    console.log(payment);
  }
  const heading = edit ? `Edit Booking` : "Add Booking";

  const options: OptionType[] = await getRideOptions();
  console.log(options);
  const vehicleTypes: VehicleType[] = await getVehicleTypes();
  console.log(vehicleTypes);

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16">
      <div className="border-b pb-4 mb-4 w-full">
        <h2 className="text-xl">{heading}</h2>
      </div>
      {edit ? (
        <EditDetails
          vehicleTypes={vehicleTypes}
          initialData={booking}
          options={options}
        />
      ) : (
        <EditDetails vehicleTypes={vehicleTypes} options={options} />
      )}
      {edit && (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          <div className="border rounded-md overflow-y-auto">
            <div className="bg-muted p-2">
              <h2>Available Drivers</h2>
            </div>
            <div className="">
              {drivers &&
                drivers.length > 0 &&
                drivers.map(
                  (item: {
                    id: string;
                    fullname: string;
                    phone: string;
                    profile_image: string;
                  }) => {
                    return (
                      <DriverItem
                        key={item.id}
                        data={item}
                        rideId={booking.id}
                        driver={booking.driver}
                      />
                    );
                  }
                )}
            </div>
          </div>
          <div className="border rounded-md">
            <div className="bg-muted p-2">
              <h2>Ride Estimate</h2>
            </div>
            <div className="flex flex-col space-y-2 p-4">
              <div className="flex flex-row items-center justify-between">
                <p>Estimate Fare</p>
                <p>{payment?.fare}</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Distance</p>
                <p>{booking?.distance}</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Estimate Time</p>
                <p>{booking?.duration}</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Tax</p>
                <p>{payment?.tax}</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Estimate Total</p>
                <p>{payment?.total}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
