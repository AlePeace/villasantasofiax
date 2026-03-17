// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleMiddleware = createMiddleware(routing);

export default function middleware(request) {
  console.log("MIDDLEWARE ESEGUITO PER:", request.url);
  return handleMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};