"use server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { fetchAPIData } from "./apifetch";
import { apiEndpoints } from "./api-endpoints";

export async function getHomeStats() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    redirect("/login?clearSession=true");
  }

  const response: any = await fetchAPIData({
    apiEndpoint: apiEndpoints.admin.home,
  });
  return response;
}
