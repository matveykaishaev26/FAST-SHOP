import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { PUBLIC_URL, ADMIN_URL, PROFILE_URL } from "./config/url.config";
import { jwtDecode } from "jwt-decode";
interface IToken {
  id: string;
  role: string;
}

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  // const decodedToken = jwtDecode<IToken>(refreshToken);
  // const userRole = decodedToken.role;
  // console.log(userRole)
  console.log(refreshToken);
  if (!refreshToken && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/store/:path*", "/auth/:path*"],
};
// try {
//   const decodedToken = jwtDecode<IToken>(refreshToken);
//   const userRole = decodedToken.role;

//   console.log("User role:", userRole);
//   console.log("Current path:", req.nextUrl.pathname);

//   if (userRole === "ADMIN" && req.nextUrl.pathname === PUBLIC_URL.home()) {
//     console.log("Redirecting to store...");
//     return NextResponse.redirect(new URL(ADMIN_URL.root(), req.nextUrl.origin));
//   }

//   // Если ADMIN, а он не на /store, то редирект
//   if (userRole === "ADMIN" && !req.nextUrl.pathname.startsWith("/admin")) {
//     console.log("Redirecting to store...");
//     return NextResponse.redirect(new URL(ADMIN_URL.root(), req.nextUrl.origin));
//   }

//   return NextResponse.next();
// } catch (error) {
//   console.error("Token decode error:", error);
//   return NextResponse.redirect(new URL(PUBLIC_URL.auth("/login"), req.nextUrl.origin));
// }
