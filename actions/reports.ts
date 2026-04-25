import axios from "axios";

import { getServerSession } from "next-auth";
import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

export async function getReportApi(reportType: string) {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("No user",session);
    }
    console.log("No user",session?.accessToken);
    const response = axios({
      url: `${env.BACKEND_URL}/api/v1/staff/report/?type=${reportType}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  
    return response;
  }
  