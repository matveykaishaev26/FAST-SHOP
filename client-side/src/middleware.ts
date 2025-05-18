import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { PUBLIC_URL, ADMIN_URL } from "./config/url.config";
import { jwtDecode } from "jwt-decode";

interface IToken {
  id: string;
  role: string;
}

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isProfileRoute = pathname.startsWith("/profile");
  const isRoot = pathname === "/";

  if (refreshToken) {
    try {
      const decodedToken = jwtDecode<IToken>(refreshToken);
      const userRole = decodedToken.role;

      // 1. Если пользователь АДМИН, и он НЕ на admin-странице → редиректим в /admin
      if (userRole === "ADMIN" && !isAdminRoute) {
        return NextResponse.redirect(new URL(ADMIN_URL.root(), req.nextUrl.origin));
      }

      // 2. Если пользователь НЕ АДМИН, но пытается попасть на /admin → редиректим на /
      if (userRole !== "ADMIN" && isAdminRoute) {
        return NextResponse.redirect(new URL(PUBLIC_URL.root(), req.nextUrl.origin));
      }

    } catch (e) {
      console.error("Invalid token:", e);
      const response = NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
      response.cookies.delete(EnumTokens.REFRESH_TOKEN);
      return response;
    }
  } else {
    // 3. Если пользователь не авторизован и пытается зайти в /profile → редиректим на /auth/login
    if (isProfileRoute) {
      return NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
    }

    // 4. Если не авторизован и пытается зайти на /admin → редиректим на /
    if (isAdminRoute) {
      return NextResponse.redirect(new URL(PUBLIC_URL.root(), req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/store/:path*", "/auth/:path*", "/admin/:path*"],
};
