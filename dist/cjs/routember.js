"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutember = useRoutember;
const stores_1 = require("./stores");
const DEFAULT_EXCLUDE_PATHS = ['/login', '/sign-in', '/sign-up', '/signup', '/forgot-password', '/reset-password', '/logout', '/api/'];
function useRoutember(store = new stores_1.LocalStorageRouteStore(), excludePaths = DEFAULT_EXCLUDE_PATHS) {
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
