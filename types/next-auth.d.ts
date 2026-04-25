import NextAuth from "next-auth/next";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    data: {
      access_token?: string;
      refresh_token?: string;
      fullname?: string;
      id?: string;
    };
  }
}
