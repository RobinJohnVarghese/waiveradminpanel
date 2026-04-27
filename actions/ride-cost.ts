import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

export async function getCabRideCosts() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }
  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-cab-ride-costs/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log('error',error);
    });

  return response;
}

export async function getChauffeurRideCosts() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-chauffeur-ride-costs/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getChauffeurRideCostDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/chauffeur-ride-cost-management/?cost_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getCabRideCostDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/cab-ride-cost-management/?cost_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getVehicleTypes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-vehicle-types/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getWorkExperiences() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-work-experiences/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getTransmissionTypes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-transmission-types/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getLocations() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-locations/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getStates() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-states/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getDistricts() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-districts/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getBanks() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-banks/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getUserRideHistory(id: string, user_type?: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/user-ride-history/?user_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getUserRideAnalytics(id: string, user_type?: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/user-ride-analytics/?user_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getDriverRideHistory(id: string, user_type?: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/driver-ride-history/?driver_id=${id}&user_type=${user_type}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getDriverRideAnalytics(id: string, user_type?: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/driver-ride-analytics/?driver_id=${id}&user_type=${user_type}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getRideDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/ride-details/?ride_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getVehicles(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/vehicles/?user_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getVehicleDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/vehicle-details/?vehicle_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getWaiverReport() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/waiver-report/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getPushNotificationReceiverTypes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/push-notification-receiver-types/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getNotifcations() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/push-notifications/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getNotifcation(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/push-notification/?notification_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getPromoReceiverTypes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/promo-receiver-types/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getPromos() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/promos/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

export async function getPromo(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/promo/?promo_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getAllBookings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/bookings/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log('abcd',error);
    });

  return response;
}

export async function getBookings(ride_status: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/bookings/?ride_status=${ride_status}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log('ssss',error);
    });

  return response;
}

export async function getBookingsAnalytics() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/bookings-analytics/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getRideOptions() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/ride-options/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getBookingDetails(booking_id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/booking/?booking_id=${booking_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getDriversForBooking(booking_id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/drivers-for-ride/?booking_id=${booking_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getBookingPayment(booking_id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/booking-payment/?booking_id=${booking_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}
