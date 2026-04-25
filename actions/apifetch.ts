import { AxiosResponse } from "axios";
import serverConnectAPI from "./server-connect-api";


export const fetchAPIData = async (params = {} as any): Promise<AxiosResponse> => {
    const { apiEndpoint, ...restParams } = params;

    return await serverConnectAPI.get(apiEndpoint, { params: restParams });
};
