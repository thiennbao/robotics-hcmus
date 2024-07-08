import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

export default async function middleware(request: NextRequest) {
  // Redirect to /admin if auth-ed
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const token = cookies().get("token")?.value as string;
    try {
      await verifyToken(token);
      return NextResponse.redirect(new URL("/admin", request.url));
    } catch {
      return NextResponse.next();
    }
  }
  // Redirect to /auth if not auth-ed
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = cookies().get("token")?.value as string;
    try {
      const decode = await verifyToken(token);
      if (request.nextUrl.pathname.startsWith("/admin/users")) {
        // Only ROOT role can access /admin/users
        if (decode.payload.role === "ROOT") {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/admin/account", request.url));
        }
      } else {
        // Other paths
        return NextResponse.next();
      }
    } catch {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
}

export const config = {
  matcher: ["/auth", "/admin/:path*"],
};
