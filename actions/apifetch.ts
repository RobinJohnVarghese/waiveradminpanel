import { AxiosResponse } from "axios";
import serverConnectAPI from "./server-connect-api";

export const fetchAPIData = async (params = {} as any): Promise<any> => {
    const { apiEndpoint, ...restParams } = params;
    try {
        return await serverConnectAPI.get(apiEndpoint, { params: restParams });
    } catch (error) {
        return null;
    }
};
