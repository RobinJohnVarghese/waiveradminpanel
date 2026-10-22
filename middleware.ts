import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const hasClearSession = req.nextUrl.searchParams.get("clearSession") === "true";

    if (isAuthPage) {
      if (hasClearSession) {
        // Render login page directly without redirecting to avoid infinite loops.
        // Cleanly wipe all next-auth session cookies (including chunked cookies).
        const response = NextResponse.next();
        for (const cookie of req.cookies.getAll()) {
          if (cookie.name.includes("next-auth")) {
            response.cookies.delete(cookie.name);
            response.cookies.set(cookie.name, "", {
              maxAge: 0,
              path: "/",
              expires: new Date(0),
            });
          }
        }
        return response;
      }

      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/:path*",
    "/login",
  ],
};
