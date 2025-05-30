import { RouteStore, LocalStorageRouteStore } from './stores';

const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];

export function useRoutember(store: RouteStore = new LocalStorageRouteStore(), excludePaths: string[] = DEFAULT_EXCLUDE_PATHS) {
  const setRedirectUrl = (url: string) => {
    if (excludePaths.some(path => url.includes(path))) return;

    store.save(url);
  };

  const getRedirectUrl = () => {
    const redirectUrl: string | null = store.get();
    store.clear();
    return redirectUrl;
  };

  const redirectAfterLogin = (router: any, defaultUrl: string = '/') => {
    const redirectUrl: string | null = getRedirectUrl();
    router.replace(redirectUrl || defaultUrl);
  };

  return { setRedirectUrl, getRedirectUrl, redirectAfterLogin };
}
