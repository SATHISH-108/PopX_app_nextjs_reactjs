import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ["/signin", "/signup"].includes(path);
  const token = await getToken({
    req: request,
    secret: process.env.SECRET_KEY,
  });
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile"],
};
