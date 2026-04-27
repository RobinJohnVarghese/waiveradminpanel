import NextAuth from "next-auth/next";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: SessionUser;
  }

  interface SessionUser {
    id: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
    permissions: Permission;
  }

  interface User {
    data: {
      access_token?: string;
      refresh_token?: string;
      fullname?: string;
      id?: string;
      permissions?: Permission;
    };
  }
}

interface Permission {
  dashboard: boolean;
  users: boolean;
  waiver: boolean;
  booking: boolean;
  location: boolean;
  ride_cost: boolean;
  role: boolean;
  promo: boolean;
  report: boolean;
  subscription: boolean;
  review: boolean;
  push_notification: boolean;
}
