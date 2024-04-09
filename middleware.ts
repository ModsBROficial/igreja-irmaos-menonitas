import { NextRequest, NextResponse } from "next/server";

type RoutePermissions = {
  [key: string]: string[]; 
}

export default function middleware(request: NextRequest, response: NextResponse) {

  var token: string | undefined = request.cookies.get("user")?.value
  let rule: string;

  let router = request.nextUrl.pathname;

  const signInURL = new URL("/", request.url)
  const dashboardURL = new URL("/dashboard", request.url)

  if (!token) {
    return NextResponse.redirect(signInURL)
  }
  
  const routePermissions: RoutePermissions = {
    '/dashboard/manage-accounts': ['administrador'],
    
    '/dashboard/system-log': ['administrador', 'presidente'],

    '/dashboard/reports/report-to-download': ['administrador', 'presidente', 'tesoureiro'],
    
    '/dashboard/categories': ['administrador','presidente', 'tesoureiro'],
    
    '/dashboard/documents': ['administrador', 'presidente', 'tesoureiro', 'pastor','contabilidade'],
    
    '/dashboard/transactions': ['administrador', 'presidente', 'tesoureiro', 'pastor', 'contabilidade', 'membro'],

    '/dashboard/reports': ['administrador', 'presidente', 'tesoureiro', 'pastor', 'contabilidade', 'membro'],
    
    '/dashboard/settings': ['administrador', 'presidente', 'tesoureiro', 'pastor', 'contabilidade', 'membro'],
    
    '/dashboard': ['administrador', 'presidente', 'tesoureiro', 'pastor', 'contabilidade', 'membro'],
  };

  let user = JSON.parse(token);
  rule = user?.rule?.name;
    
  const allowedRoles = routePermissions[router] ?? [];
  const errorMessage = "Você não tem acesso a esta página.";

  if (!allowedRoles || !allowedRoles?.includes(rule)) {
    return NextResponse.redirect(`${dashboardURL}?error=${encodeURIComponent(errorMessage)}`)
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
}