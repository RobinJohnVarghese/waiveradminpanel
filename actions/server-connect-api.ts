
import axios from "axios";
import { useRouter } from 'next/navigation'
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";

const serverConnectAPI = axios.create({
    // baseURL: baseURL,
    baseURL: `https://api.waiverapp.in/api/v1/staff/`,
    headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
});

serverConnectAPI.interceptors.request.use(async function (config: any) {
    const session = await getServerSession(authOptions);
    if (!session) {
        console.log("No user");
    }
    config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
    return config;
}, function (error) {

    return Promise.reject(error);
});

serverConnectAPI.interceptors.response.use(async function (response: any) {
    if ((response) && (response.status === 200)) {
        if (response.data) {
            if (response.data.data) {
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
            window.location.replace('/login');
        }
    } else {
        if (response.status === 201) {

        }
    }
}, function (error) {
    if (error && error.response) {
        const { data, status } = error.response;
        if ((data) && (status == '401')) {
            // signOut({
            //     callbackUrl: `${window.location.origin}/login`,
            // });
            if (typeof window !== "undefined") {
                window.location.replace('/login');
            }
        } else if ((status === 500) && data) {
            return Promise.reject(data.message);
        } else {
            return Promise.reject(error.message);
        }
    } else {
        return Promise.reject(error.message);
    }
    return Promise.reject(error);
});

export default serverConnectAPI;