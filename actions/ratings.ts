import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

export async function getRatings(review_type: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-ratings/?review_type=${review_type}`,
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
