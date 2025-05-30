import { RouteStore } from './stores';

const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];

export function useRoutember(store: RouteStore, excludePaths: string[] = DEFAULT_EXCLUDE_PATHS) {
  let currentStore: RouteStore = store;

  const setRedirectUrl = async (url: string) => {
    if (excludePaths.some(path => url.includes(path))) return;

    await currentStore.save(url);
  };

  const getRedirectUrl = async () => {
    const redirectUrl: string | null = await currentStore.get();
    await currentStore.clear();
    return redirectUrl;
  };

  const redirectRememberedUrl = async (router: any, defaultUrl: string = '/') => {
    const redirectUrl: string | null = await getRedirectUrl();
    router.replace(redirectUrl || defaultUrl);
  };

  return { setRedirectUrl, getRedirectUrl, redirectRememberedUrl };
}
