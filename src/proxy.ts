import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname === '/login') {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // 2. 身份验证：如果没有 Token，重定向到登录页
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 3. 多租户隔离 (Tenant Check)
  // 假设租户信息存储在 Token 中
  const tenantId = token.tenantId;
  if (!tenantId && pathname !== '/select-tenant') {
    const url = req.nextUrl.clone();
    url.pathname = '/select-tenant';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};