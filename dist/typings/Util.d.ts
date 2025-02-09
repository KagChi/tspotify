export interface CacheAfterFetching_O {
    /**
     * Whether to cache the fetched content or not
     */
    cacheAfterFetching?: boolean;
}
export interface Country_O {
    country?: string;
}
export interface Limit_O {
    /**
     * The maximum number of items to fetch
     */
    limit?: number;
}
export interface Limit_R {
    /**
     * The maximum number of items to fetch
     */
    limit: number;
}
export interface Locale_O {
    locale?: string;
}
export interface Market_O {
    /**
     * The market you’d like to request
     */
    market?: string;
}
export interface Market_R {
    /**
     * The market you’d like to request
     */
    market: string;
}
export interface Offset_O {
    /**
     * The index of the first item to fetch. Use this with `limit` to fetch the next set of items
     */
    offset?: number;
}
export interface Offset_R {
    /**
     * The index of the first item to fetch. Use this with `limit` to fetch the next set of items
     */
    offset: number;
}
export interface SkipCacheCheck_O {
    /**
     * Whether to skip the cache check and fetch from the API directly
     */
    skipCacheCheck?: boolean;
}
