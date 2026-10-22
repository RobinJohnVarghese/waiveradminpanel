import axios from "axios";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const serverConnectAPI = axios.create({
    baseURL: `${env.BACKEND_URL?.replace(/\/$/, "")}/api/v1/staff/`,
    headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
});

serverConnectAPI.interceptors.request.use(async function (config: any) {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
        return Promise.reject(new Error("UNAUTHORIZED_NO_TOKEN"));
    }
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

serverConnectAPI.interceptors.response.use(function (response: any) {
    if (response && response.status === 200) {
        if (response.data) {
            return response.data.data !== undefined ? response.data.data : response.data;
        }
        return response;
    }
    return response;
}, function (error) {
    if (error && error.response) {
        const { data, status } = error.response;
        if (status === 401 || status === "401") {
            return Promise.reject(new Error("UNAUTHORIZED_EXPIRED_TOKEN"));
        }
        if (status === 500 && data) {
            return Promise.reject(new Error(typeof data === "string" ? data : data.message || "Internal server error"));
        }
    }
    return Promise.reject(error);
});

export default serverConnectAPI;
