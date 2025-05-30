"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutember = useRoutember;
const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];
function useRoutember(store = null, excludePaths = DEFAULT_EXCLUDE_PATHS) {
    let currentStore = store;
    const setStore = (store) => {
        currentStore = store;
    };
    const setRedirectUrl = async (url) => {
        if (!currentStore)
            throw new Error('Store is not set');
        const strippedUrl = stripUrl(url);
        if (excludePaths.some(path => strippedUrl.includes(path)))
            return;
        await currentStore.save(strippedUrl);
    };
    const getRedirectUrl = async () => {
        if (!currentStore)
            throw new Error('Store is not set');
        const redirectUrl = await currentStore.get();
        await currentStore.clear();
        return redirectUrl;
    };
    const redirectRememberedUrl = async (router, defaultUrl = '/') => {
        const redirectUrl = await getRedirectUrl();
        router.replace(redirectUrl || defaultUrl);
    };
    const stripUrl = (url) => {
        return url.replace(/^[^#]*?:\/\/.*?(\/.*)$/, '$1');
    };
    return { setStore, setRedirectUrl, getRedirectUrl, redirectRememberedUrl };
}
