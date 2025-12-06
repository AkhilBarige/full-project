import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;

    // Define public routes (prefix match for nested paths)
    const publicPaths = ["/", "/login", "/signup"];

    const isPublic = publicPaths.some((path) =>
        pathname === path || pathname.startsWith(`${path}/`)
    );

    // Redirect if not logged in and trying to access a protected route
    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};