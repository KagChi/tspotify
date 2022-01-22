var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseManager from './BaseManager.js';
import Category from '../structures/Category.js';
import { Page, RequestData } from '../structures/Misc.js';
import SimplifiedPlaylist from '../structures/SimplifiedPlaylist.js';
export default class CategoryManager extends BaseManager {
    constructor(client) {
        super(client, Category);
    }
    /**
     * Fetches one or more categories from Spotify
     * @param options Options for fetching categories
     * @returns A `Category` or a Page of `Category` objects as a Promise
     */
    fetch(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No options were provided');
            const categoryId = this.resolveId(options);
            // @ts-ignore
            if (categoryId)
                return this._fetchSingle(categoryId, options);
            const categoryResolvable = (_a = options) === null || _a === void 0 ? void 0 : _a.categoryResolvable;
            if (categoryResolvable) {
                const categoryId = this.resolveId(categoryResolvable);
                // @ts-ignore
                if (categoryId)
                    return this._fetchSingle(categoryId, options);
            }
            // @ts-ignore
            return this._fetchMultiple(options);
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedCategory = this.cache.get(id);
                if (cachedCategory)
                    return cachedCategory;
            }
            const query = {
                country: options === null || options === void 0 ? void 0 : options.country,
                locale: options === null || options === void 0 ? void 0 : options.locale,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.browse.categories(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    _fetchMultiple(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                country: options === null || options === void 0 ? void 0 : options.country,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                locale: options === null || options === void 0 ? void 0 : options.locale,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.browse.categories.get(requestData);
            return new Page(this.client, data.categories, Category);
        });
    }
    /**
     * Fetches playlists listed under a specific category
     * @param categoryResolvable The category from which playlists are to be fetched
     * @param options Options for fetching the playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchPlaylists(categoryResolvable, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = this.resolveId(categoryResolvable);
            if (!categoryId)
                throw new Error('Invalid category');
            const query = {
                country: options === null || options === void 0 ? void 0 : options.country,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.browse
                .categories(categoryId)
                .playlists.get(requestData);
            return new Page(this.client, data.playlists, SimplifiedPlaylist);
        });
    }
}
