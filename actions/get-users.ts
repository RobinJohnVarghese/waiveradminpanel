import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";
import { fetchAPIData } from "./apifetch";
import { apiEndpoints } from "./api-endpoints";

export async function getUsers(
  type: string,
  location?: string,
  onlineOffline?: string,
  status?: string,
  minRating?: string,
  maxRating?: string
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const queryParams = new URLSearchParams();
  queryParams.append("type", type);
  if (location) queryParams.append("location", location);
  if (onlineOffline) queryParams.append("online-offline", onlineOffline);
  if (status) queryParams.append("status", status);
  if (minRating) queryParams.append("min_rating", minRating);
  if (maxRating) queryParams.append("max_rating", maxRating);
  const paramsObject = Object.fromEntries(queryParams.entries());

  const response: any = await fetchAPIData({
    apiEndpoint: apiEndpoints.admin.users.users,
    ...paramsObject
  });

  // const response = axios({
  //   url: `${env.BACKEND_URL}/api/v1/staff/users/?${queryParams}`,
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`,
  //   },
  // })
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data.data;
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //   });

  return response;
}

export async function getUserDetails(id: string, type?: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/user-details/?id=${id}&type=${type}`,
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

export async function getInternalUsers() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/internal-users/`,
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

export async function getInternalUserDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/internal-user/?id=${id}`,
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
