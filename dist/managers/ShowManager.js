var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Show from '../structures/Show.js';
import BaseManager from './BaseManager.js';
import { RequestData } from '../structures/Misc.js';
import Collection from '../util/Collection.js';
import SimplifiedShow from '../structures/SimplifiedShow.js';
import SimplifiedEpisode from '../structures/SimplifiedEpisode.js';
import { Page } from '../structures/Misc.js';
export default class ShowManager extends BaseManager {
    constructor(client) {
        super(client, Show);
    }
    /**
     * Resolves a ShowResolvable to a Show object
     */
    resolve(showResolvable) {
        const show = super.resolve(showResolvable);
        if (show)
            return show;
        const showId = this.resolveId(showResolvable);
        if (showId)
            return super.resolve(showId);
        return null;
    }
    /**
     * Resolves a ShowResolvable to a Show ID
     */
    resolveId(showResolvable) {
        const showId = super.resolveId(showResolvable);
        if (showId)
            return showId;
        if (showResolvable.id) {
            return showResolvable.id;
        }
        return null;
    }
    fetch(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No show IDs were provided');
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new Error('No market was provided');
            const show = (_a = options) === null || _a === void 0 ? void 0 : _a.show;
            if (show) {
                const showId = this.resolveId(show);
                // @ts-ignore
                if (showId)
                    return this._fetchSingle(showId, options);
            }
            const shows = (_b = options) === null || _b === void 0 ? void 0 : _b.shows;
            if (shows) {
                if (Array.isArray(shows)) {
                    const showIds = shows.map(show => this.resolveId(show));
                    // @ts-ignore
                    if (showIds)
                        return this._fetchMany(showIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.skipCacheCheck) {
                const cachedShow = this.resolve(id);
                if (cachedShow)
                    return cachedShow;
            }
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.shows(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    /**
     * **⚠️Note**: Unlike other bulk endpoints, this one doesn't return a complete object. Since, the object(s) fetched
     * by this method are `SimplifiedShow`, they aren't cached
     */
    _fetchMany(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                ids,
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.shows.get(requestData);
            const simplifiedShows = new Collection();
            data.shows.forEach(simplifiedShowObject => {
                const simplifiedShow = new SimplifiedShow(this.client, simplifiedShowObject);
                simplifiedShows.set(simplifiedShow.id, simplifiedShow);
            });
            return simplifiedShows;
        });
    }
    /**
     * Fetches episodes of a show
     * @param show The show whose episodes are to be fetched
     * @param options The options for fetching episodes of a show
     * @returns A Page of `SimplifiedEpisode` objects as a Promise
     */
    fetchEpisodes(show, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const showId = this.resolveId(show);
            if (!showId)
                throw new Error('Invalid show');
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new Error('No market was provided');
            const query = {
                market: options.market,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.shows(showId).episodes.get(requestData);
            return new Page(this.client, data, SimplifiedEpisode);
        });
    }
    /**
     * Fetches shows from Spotify by searching
     * @param options The options provided for searching shows
     * @returns A `Page` of `SimplifiedShow` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new Error('Market was not provided');
            const data = yield _super._search.call(this, options, 'show', options.market);
            return new Page(this.client, data.shows, SimplifiedShow);
        });
    }
}
