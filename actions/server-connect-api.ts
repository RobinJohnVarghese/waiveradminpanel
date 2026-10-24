import axios from "axios";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";

const serverConnectAPI = axios.create({
    baseURL: `${env.BACKEND_URL}/api/v1/staff/`,
    headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
    timeout: 8000,
});

serverConnectAPI.interceptors.request.use(async function (config: any) {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
        return Promise.reject(new Error("No user session / access token"));
    }
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

serverConnectAPI.interceptors.response.use(async function (response: any) {
    if ((response) && (response.status === 200)) {
        if (response.data) {
            if (response.data.data !== undefined) {
                return response.data.data;
            } else {
                return response.data;
            }
        } else {
            return response;
        }
    } else if (response.status === 201) {
        if (typeof window !== "undefined") {
            signOut({
                callbackUrl: `${window.location.origin}/login`,
            });
            window.location.replace("/login");
        }
    }
    return response;
}, function (error) {
    if (error && error.response) {
        const { data, status } = error.response;
        if ((data) && (status == "401")) {
            if (typeof window !== "undefined") {
                window.location.replace("/login");
            }
        } else if ((status === 500) && data) {
            return Promise.reject(data.message);
        } else {
            return Promise.reject(error.message);
        }
    } else {
        return Promise.reject(error?.message || "Request failed");
    }
    return Promise.reject(error);
});

export default serverConnectAPI;
