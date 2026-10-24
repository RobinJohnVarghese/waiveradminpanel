import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

async function staffGet<T = any>(endpoint: string, fallback: any = undefined): Promise<any> {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return fallback;
  }
  try {
    const res = await axios.get(`${env.BACKEND_URL}/api/v1/staff${endpoint.startsWith("/") ? "" : "/"}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      timeout: 8000,
    });
    return (res.data?.data ?? fallback) as T;
  } catch (error) {
    return fallback;
  }
}

export async function getCabRideCosts() {
  return staffGet("/get-cab-ride-costs/", []);
}

export async function getChauffeurRideCosts() {
  return staffGet("/get-chauffeur-ride-costs/", []);
}

export async function getChauffeurRideCostDetails(id: string) {
  return staffGet(`/chauffeur-ride-cost-management/?cost_id=${id}`, null);
}

export async function getCabRideCostDetails(id: string) {
  return staffGet(`/cab-ride-cost-management/?cost_id=${id}`, null);
}

export async function getVehicleTypes() {
  return staffGet("/get-vehicle-types/", []);
}

export async function getWorkExperiences() {
  return staffGet("/get-work-experiences/", []);
}

export async function getTransmissionTypes() {
  return staffGet("/get-transmission-types/", []);
}

export async function getLocations() {
  return staffGet("/get-locations/", []);
}

export async function getStates() {
  return staffGet("/get-states/", []);
}

export async function getDistricts() {
  return staffGet("/get-districts/", []);
}

export async function getBanks() {
  return staffGet("/get-banks/", []);
}

export async function getUserRideHistory(id: string, user_type?: string) {
  return staffGet(`/user-ride-history/?user_id=${id}`, []);
}

export async function getUserRideAnalytics(id: string, user_type?: string) {
  return staffGet(`/user-ride-analytics/?user_id=${id}`, null);
}

export async function getDriverRideHistory(id: string, user_type?: string) {
  return staffGet(`/driver-ride-history/?driver_id=${id}&user_type=${user_type || ""}`, []);
}

export async function getDriverRideAnalytics(id: string, user_type?: string) {
  return staffGet(`/driver-ride-analytics/?driver_id=${id}&user_type=${user_type || ""}`, null);
}

export async function getRideDetails(id: string) {
  return staffGet(`/ride-details/?ride_id=${id}`, null);
}

export async function getVehicles(id: string) {
  return staffGet(`/vehicles/?user_id=${id}`, []);
}

export async function getVehicleDetails(id: string) {
  return staffGet(`/vehicle-details/?vehicle_id=${id}`, null);
}

export async function getWaiverReport() {
  return staffGet("/waiver-report/", []);
}

export async function getPushNotificationReceiverTypes() {
  return staffGet("/push-notification-receiver-types/", []);
}

export async function getNotifcations() {
  return staffGet("/push-notifications/", []);
}

export async function getNotifcation(id: string) {
  return staffGet(`/push-notification/?notification_id=${id}`, null);
}

export async function getPromoReceiverTypes() {
  return staffGet("/promo-receiver-types/", []);
}

export async function getPromos() {
  return staffGet("/promos/", []);
}

export async function getPromo(id: string) {
  return staffGet(`/promo/?promo_id=${id}`, null);
}

export async function getAllBookings() {
  return staffGet("/bookings/", []);
}

export async function getBookings(ride_status: string) {
  return staffGet(`/bookings/?ride_status=${encodeURIComponent(ride_status)}`, []);
}

export async function getBookingsAnalytics() {
  return staffGet("/bookings-analytics/", null);
}

export async function getRideOptions() {
  return staffGet("/ride-options/", []);
}

export async function getBookingDetails(booking_id: string) {
  return staffGet(`/booking/?booking_id=${booking_id}`, null);
}

export async function getDriversForBooking(booking_id: string) {
  return staffGet(`/drivers-for-ride/?booking_id=${booking_id}`, []);
}

export async function getBookingPayment(booking_id: string) {
  return staffGet(`/booking-payment/?booking_id=${booking_id}`, null);
}
