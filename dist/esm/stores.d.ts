export interface RouteStore {
    save(url: string): void;
    get(): string | null;
    clear(): void;
}
export declare class LocalStorageRouteStore implements RouteStore {
    private key;
    constructor(key?: string);
    save(url: string): void;
    get(): string | null;
    clear(): void;
}
export declare class CookieRouteStore implements RouteStore {
    private cookieName;
    constructor(cookieName?: string);
    save(url: string): void;
    get(): string | null;
    clear(): void;
}
//# sourceMappingURL=stores.d.ts.map