"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieRouteStore = exports.LocalStorageRouteStore = void 0;
class LocalStorageRouteStore {
    key;
    constructor(key = 'routember') {
        this.key = key;
    }
    save(url) {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.key, url);
        }
    }
    get() {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(this.key);
        }
        return null;
    }
    clear() {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(this.key);
        }
    }
}
exports.LocalStorageRouteStore = LocalStorageRouteStore;
class CookieRouteStore {
    cookieName;
    constructor(cookieName = 'routember') {
        this.cookieName = cookieName;
    }
    save(url) {
        if (typeof document !== 'undefined') {
            document.cookie = `${this.cookieName}=${encodeURIComponent(url)}; path=/;`;
        }
    }
    get() {
        if (typeof document !== 'undefined') {
            const nameEQ = this.cookieName + '=';
            const cookies = document.cookie.split('; ');
            for (const c of cookies) {
                if (c.indexOf(nameEQ) === 0) {
                    const value = c.substring(nameEQ.length);
                    return decodeURIComponent(value);
                }
            }
        }
        return null;
    }
    clear() {
        if (typeof document !== 'undefined') {
            document.cookie = `${this.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        }
    }
}
exports.CookieRouteStore = CookieRouteStore;
