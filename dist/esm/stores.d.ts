export interface RouteStore {
    save(url: string): Promise<void>;
    get(): Promise<string | null>;
    clear(): Promise<void>;
}
export declare class CookieRouteStore implements RouteStore {
    private cookieName;
    private cookie;
    constructor(cookie: any, cookieName?: string);
    save(url: string): Promise<void>;
    get(): Promise<string | null>;
    clear(): Promise<void>;
}
//# sourceMappingURL=stores.d.ts.map