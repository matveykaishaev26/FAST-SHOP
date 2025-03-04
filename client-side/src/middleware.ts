import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { PUBLIC_URL, STORE_URL } from "./config/url.config";
import { jwtDecode } from "jwt-decode";
interface IToken {
  id: string;
  role: string;
}

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
  }

  try {
    const decodedToken = jwtDecode<IToken>(refreshToken);
    const userRole = decodedToken.role;

    console.log("User role:", userRole);
    console.log("Current path:", req.nextUrl.pathname);

    // Если ADMIN, а он на корневом пути (/), то редирект на /store
    if (userRole === "ADMIN" && req.nextUrl.pathname === PUBLIC_URL.home()) {
      console.log("Redirecting to store...");
      return NextResponse.redirect(new URL(STORE_URL.root(), req.nextUrl.origin));
    }

    // Если ADMIN, а он не на /store, то редирект
    if (userRole === "ADMIN" && !req.nextUrl.pathname.startsWith("/store")) {
      console.log("Redirecting to store...");
      return NextResponse.redirect(new URL(STORE_URL.root(), req.nextUrl.origin));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token decode error:", error);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/store/:path*", "/auth/:path*"],
};
