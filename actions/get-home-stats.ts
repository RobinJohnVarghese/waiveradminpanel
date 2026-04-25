import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";
import { fetchAPIData } from "./apifetch";
import { apiEndpoints } from "./api-endpoints";

export async function getHomeStats() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    // console.log("No user");
  }
  const response: any = await fetchAPIData({
    apiEndpoint: apiEndpoints.admin.home,
  });
  return response;
}
