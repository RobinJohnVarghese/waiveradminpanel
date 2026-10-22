import { AxiosResponse } from "axios";
import serverConnectAPI from "./server-connect-api";
import { redirect } from "next/navigation";

export const fetchAPIData = async (params = {} as any): Promise<any> => {
    const { apiEndpoint, ...restParams } = params;

    try {
        return await serverConnectAPI.get(apiEndpoint, { params: restParams });
    } catch (error: any) {
        const is401 =
            error?.message === "UNAUTHORIZED_NO_TOKEN" ||
            error?.message === "UNAUTHORIZED_EXPIRED_TOKEN" ||
            error?.response?.status === 401 ||
            error?.status === 401 ||
            error?.message === "Request failed with status code 401";

        if (is401) {
            redirect("/login?clearSession=true");
        }
        throw error;
    }
};
