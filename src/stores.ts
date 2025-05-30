export interface RouteStore {
  save(url: string): Promise<void>;
  get(): Promise<string | null>;
  clear(): Promise<void>;
}

export class CookieRouteStore implements RouteStore {
  private cookieName: string;
  private cookie: any;

  constructor(cookie: any, cookieName: string = 'routember') {
    this.cookie = cookie;
    this.cookieName = cookieName;
  }

  async save(url: string): Promise<void> {
    await this.cookie.set(this.cookieName, url);
  }

  async get(): Promise<string | null> {
    const value = await this.cookie.get(this.cookieName);
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'object' && value.value) {
      return value.value;
    }
    return null;
  }

  async clear(): Promise<void> {
    if (typeof this.cookie.delete === 'function') {
      await this.cookie.delete(this.cookieName);
    } else if (typeof this.cookie.remove === 'function') {
      await this.cookie.remove(this.cookieName);
    } else {
      throw new Error('Cookie store does not support remove or delete method');
    }
  }
}
