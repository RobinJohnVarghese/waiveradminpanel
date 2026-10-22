import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

export async function getReportApi(reportType: string) {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
        redirect("/login?clearSession=true");
    }
    const response = axios({
      url: `${env.BACKEND_URL}/api/v1/staff/report/?type=${reportType}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
            redirect("/login?clearSession=true");
        }
      });
  
    return response;
}
