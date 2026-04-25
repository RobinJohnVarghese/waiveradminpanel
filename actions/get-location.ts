import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";
import { fetchAPIData } from "./apifetch";
import { apiEndpoints } from "./api-endpoints";


export async function getLocationDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/location-management/?id=${id}`,
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
export async function getLiveLocation() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response: any = await fetchAPIData({
    apiEndpoint: apiEndpoints.admin.liveLocation,
  });

  return response;
}
