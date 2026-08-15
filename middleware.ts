import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { estimateTokens, markdownForPath } from "@/lib/agent/markdown";
import { AGENT_LINK_HEADERS } from "@/lib/agent/site";

function withAgentHeaders(response: NextResponse, pathname: string) {
  if (pathname === "/" || pathname === "") {
    response.headers.set("Link", AGENT_LINK_HEADERS);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/markdown")) {
    const markdown = markdownForPath(pathname);
    if (markdown) {
      const response = new NextResponse(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": String(estimateTokens(markdown)),
          Vary: "Accept"
        }
      });
      return withAgentHeaders(response, pathname);
    }
  }

  let response = NextResponse.next({ request });
  response = withAgentHeaders(response, pathname);

  const isProtected = pathname.startsWith("/portal") || pathname.startsWith("/admin");
  if (!isProtected) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          response = withAgentHeaders(response, pathname);
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/", "/about", "/services", "/contact", "/docs/:path*", "/portal/:path*", "/admin/:path*"]
};
