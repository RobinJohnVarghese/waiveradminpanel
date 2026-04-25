import axios from "axios";
import { getServerSession } from "next-auth";

import { env } from "@/env.mjs";
import { authOptions } from "@/lib/auth";

export async function getSubscriptionPlans() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-subscription-plans/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}


export async function getSubscriptionPlanDetails(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/subscription-management/?plan_id=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}


export async function getSubscriptionPlanTypes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-subscription-plan-types/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

export async function getSubscriptionPlanServices() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No user");
  }

  const response = axios({
    url: `${env.BACKEND_URL}/api/v1/staff/get-subscription-plan-services/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}
