import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        // console.log("hello")
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        return (
          (await axios({
            method: "post",
            url: `${env.BACKEND_URL}/api/v1/staff/login/`,
            data: JSON.stringify({
              username: username,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              console.log('response', response);

              return response.data;
            })
            .catch((error) => {
              throw new Error(error.response.data.error);
            })) || null
        );
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.accessToken = user.data.access_token;
        token.refreshToken = user.data.refresh_token;
        token.userId = user.data.id;
        token.name = user.data.fullname;
      }

      return token;
    },
  },
};
