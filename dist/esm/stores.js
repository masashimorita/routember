export class CookieRouteStore {
    cookieName;
    cookie;
    constructor(cookie, cookieName = 'routember') {
        this.cookie = cookie;
        this.cookieName = cookieName;
    }
    async save(url) {
        await this.cookie.set(this.cookieName, url);
    }
    async get() {
        const value = await this.cookie.get(this.cookieName);
        if (typeof value === 'string') {
            return value;
        }
        else if (typeof value === 'object' && value.value) {
            return value.value;
        }
        return null;
    }
    async clear() {
        if (typeof this.cookie.delete === 'function') {
            await this.cookie.delete(this.cookieName);
        }
        else if (typeof this.cookie.remove === 'function') {
            await this.cookie.remove(this.cookieName);
        }
        else {
            throw new Error('Cookie store does not support remove or delete method');
        }
    }
}
