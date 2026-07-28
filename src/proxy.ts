import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  if (host === "www.bymuja.com") {
    const redirectUrl = new URL(request.url);
    redirectUrl.host = "bymuja.com";
    return NextResponse.redirect(redirectUrl, 301);
  }

  const hostname = host.split(":")[0];
  const parts = hostname.split(".");

  let subdomain: string | null = null;

  if (hostname.includes("localhost") || hostname === "localhost") {
    if (parts.length > 1 && parts[0] !== "localhost") {
      subdomain = parts[0];
    }
  } else if (hostname.endsWith("bymuja.com")) {
    if (parts.length >= 3 && parts[0] !== "www") {
      subdomain = parts[0];
    }
  }

  if (subdomain === "blog") {
    if (!url.pathname.startsWith("/blog")) {
      url.pathname = url.pathname === "/" ? "/blog" : `/blog${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (subdomain === "projects") {
    if (!url.pathname.startsWith("/projects")) {
      url.pathname =
        url.pathname === "/" ? "/projects" : `/projects${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (subdomain === "music") {
    if (!url.pathname.startsWith("/music")) {
      url.pathname =
        url.pathname === "/" ? "/music" : `/music${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (subdomain === "funmacs") {
    if (!url.pathname.startsWith("/funmacs")) {
      url.pathname =
        url.pathname === "/" ? "/funmacs" : `/funmacs${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (subdomain === "mujaos") {
    if (!url.pathname.startsWith("/mujaos")) {
      url.pathname =
        url.pathname === "/" ? "/mujaos" : `/mujaos${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
