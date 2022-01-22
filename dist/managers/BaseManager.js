var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Collection from '../util/Collection.js';
import { RequestData } from '../structures/Misc.js';
/**
 * Base class for all managers
 */
export default class BaseManager {
    /**
     * @param client The client that instantiated this manager
     * @param structureType The type of structure held by this manager
     */
    constructor(client, structureType) {
        Object.defineProperty(this, 'client', { writable: true });
        this.client = client;
        this.cache = new Collection();
        Object.defineProperty(this, '_holds', { writable: true });
        this._holds = structureType;
    }
    /**
     * Resolves a structure resolvable to its respective structure
     * @param idOrInstance The ID or instance of the structure held by this manager
     */
    resolve(idOrInstance) {
        var _a;
        if (idOrInstance instanceof this._holds)
            return idOrInstance;
        if (typeof idOrInstance === 'string')
            return (_a = this.cache.get(idOrInstance)) !== null && _a !== void 0 ? _a : null;
        return null;
    }
    /**
     * Resolves a structure resolvable to its id
     * @param idOrInstance The ID or instance of the strucutre held by this manager
     */
    resolveId(idOrInstance) {
        if (idOrInstance instanceof this._holds)
            return idOrInstance.id;
        if (typeof idOrInstance === 'string')
            return idOrInstance;
        return null;
    }
    /**
     * Converts raw data sent by the API to a structure and adds it to the cache
     * @param id The ID of the structure
     * @param cacheAfterFetching Whether to cache the structure or not
     * @param data The raw data returned by the API for this structure
     */
    add(id, cacheAfterFetching = true, data) {
        const entry = new this._holds(this.client, data);
        if (cacheAfterFetching)
            this.cache.set(id, entry);
        return entry;
    }
    /**
     * Searches Spotify
     * @param options The options for searching
     * @param type The type of items to search
     */
    _search(options, type, market) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                include_external: options === null || options === void 0 ? void 0 : options.includeExternal,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                market,
                offset: options === null || options === void 0 ? void 0 : options.offset,
                q: options.query,
                type: [type],
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.search.get(requestData);
            return data;
        });
    }
}
