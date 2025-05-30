import { RouteStore } from './stores';
export declare function useRoutember(store?: RouteStore, excludePaths?: string[]): {
    setRedirectUrl: (url: string) => void;
    getRedirectUrl: () => string | null;
    redirectAfterLogin: (router: any, defaultUrl?: string) => void;
};
//# sourceMappingURL=routember.d.ts.map