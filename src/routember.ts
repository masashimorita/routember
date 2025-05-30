import { RouteStore } from './stores';

const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];

export function useRoutember(store: RouteStore | null = null, excludePaths: string[] = DEFAULT_EXCLUDE_PATHS) {
  let currentStore: RouteStore | null = store;

  const setStore = (store: RouteStore) => {
    currentStore = store;
  };
  
  const setRedirectUrl = async (url: string) => {
    if (!currentStore) throw new Error('Store is not set');
    if (excludePaths.some(path => url.includes(path))) return;

    await currentStore.save(url);
  };

  const getRedirectUrl = async () => {
    if (!currentStore) throw new Error('Store is not set');

    const redirectUrl: string | null = await currentStore.get();
    await currentStore.clear();
    return redirectUrl;
  };

  const redirectRememberedUrl = async (router: any, defaultUrl: string = '/') => {
    const redirectUrl: string | null = await getRedirectUrl();
    router.replace(redirectUrl || defaultUrl);
  };

  return { setStore, setRedirectUrl, getRedirectUrl, redirectRememberedUrl };
}
