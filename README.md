# Routember

Remember the URL before redirect


## Installation

```bash
npm install routember
```

## Usage

#### Using Next.js (Middleware + Custom Hook)


1. Store accessing URL in middleware
```TypeScript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { useRoutember, CookieRouteStore } from 'routember';

export async function middleware(request: NextRequest) {
  const { setStore, setRedirectUrl } = useRoutember();
  const isLoggedIn = !!request.cookies.get('auth_token');

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith('/login')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    const store = new CookieRouteStore(await cookies());
    setStore(store);
    setRedirectUrl(request.nextUrl.href);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'],
};
```

2. Redirect after login via hook
```TypeScript
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useRoutember, CookieRouteStore } from 'routember';

export default function LoginPage() {
  const router = useRouter();
  const store = new CookieRouteStore(Cookies);
  const { redirectRememberedUrl } = useRoutember(store);

  const handleLogin = async () => {
    // Process login...
    redirectRememberedUrl(router, '/dashboard');
  };

  return (
    <div>
      <form>
        {/* form inptus */}
        <button onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
```
