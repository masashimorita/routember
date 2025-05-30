import { RouteStore } from './stores';
export declare function useRoutember(store?: RouteStore | null, excludePaths?: string[]): {
    setStore: (store: RouteStore) => void;
    setRedirectUrl: (url: string) => Promise<void>;
    getRedirectUrl: () => Promise<string | null>;
    redirectRememberedUrl: (router: any, defaultUrl?: string) => Promise<void>;
};
//# sourceMappingURL=routember.d.ts.map