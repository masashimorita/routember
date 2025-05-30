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
import { useRoutember } from 'routember';

export function middleware(request: NextRequest) {
  const { setRedirectUrl } = useRoutember();
  const isLoggedIn = !!request.cookies.get('auth_token');

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith('/login')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
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
import { useRoutember } from 'routember';

export default function LoginPage() {
  const router = useRouter();
  const { redirectAfterLogin } = useRoutember();

  const handleLogin = async () => {
    // Process login...
    redirectAfterLogin(router, '/dashboard');
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
