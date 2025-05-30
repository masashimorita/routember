import { LocalStorageRouteStore } from './stores';
const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];
export function useRoutember(store = new LocalStorageRouteStore(), excludePaths = DEFAULT_EXCLUDE_PATHS) {
    const setRedirectUrl = (url) => {
        if (excludePaths.some(path => url.includes(path)))
            return;
        store.save(url);
    };
    const getRedirectUrl = () => {
        const redirectUrl = store.get();
        store.clear();
        return redirectUrl;
    };
    const redirectAfterLogin = (router, defaultUrl = '/') => {
        const redirectUrl = getRedirectUrl();
        router.replace(redirectUrl || defaultUrl);
    };
    return { setRedirectUrl, getRedirectUrl, redirectAfterLogin };
}
