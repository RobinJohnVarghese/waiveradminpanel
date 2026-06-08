import { AxiosResponse } from "axios";
import serverConnectAPI from "./server-connect-api";
import { redirect } from "next/navigation";

export const fetchAPIData = async (params = {} as any): Promise<AxiosResponse> => {
    const { apiEndpoint, ...restParams } = params;

    try {
        return await serverConnectAPI.get(apiEndpoint, { params: restParams });
    } catch (error: any) {
        if (error === "Request failed with status code 401" || error?.message === "Request failed with status code 401" || error?.response?.status === 401) {
            redirect("/login?clearSession=true");
        }
        throw error;
    }
};
