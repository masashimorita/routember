export interface RouteStore {
  save(url: string): void;
  get(): string | null;
  clear(): void;
}

export class CookieRouteStore implements RouteStore {
  private cookieName: string;
  constructor(cookieName: string = 'routember') {
    this.cookieName = cookieName;
  }
  save(url: string): void {
    if (typeof document !== 'undefined') {
      document.cookie = `${this.cookieName}=${encodeURIComponent(url)}; path=/;`;
    }
  }
  get(): string | null {
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
  clear(): void {
    if (typeof document !== 'undefined') {
      document.cookie = `${this.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  }
}
