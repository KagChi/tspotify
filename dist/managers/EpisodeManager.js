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
import Episode from '../structures/Episode.js';
import { Page, RequestData } from '../structures/Misc.js';
import Collection from '../util/Collection.js';
import SimplifiedEpisode from '../structures/SimplifiedEpisode.js';
import { CustomTypeError } from '../errors/ErrorIndex.js';
export default class EpisodeManager extends BaseManager {
    constructor(client) {
        super(client, Episode);
    }
    /**
     * Resolves an EpisodeResolvable to an Episode object
     */
    resolve(episodeResolvable) {
        const episode = super.resolve(episodeResolvable);
        if (episode)
            return episode;
        const episodeId = this.resolveId(episodeResolvable);
        if (episodeId)
            return super.resolve(episodeId);
        return null;
    }
    /**
     * Resolves an EpisodeResolvable to an Episode ID
     */
    resolveId(episodeResolvable) {
        const episodeId = super.resolveId(episodeResolvable);
        if (episodeId)
            return episodeId;
        if (episodeResolvable.id) {
            return episodeResolvable.id;
        }
        return null;
    }
    /**
     * Fetches episode(s) from Spotify
     */
    fetch(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No episode IDs were provided');
            const episode = (_a = options) === null || _a === void 0 ? void 0 : _a.episode;
            if (episode) {
                const episodeId = this.resolveId(episode);
                // @ts-ignore
                if (episodeId)
                    return this._fetchSingle(episodeId, options);
            }
            const episodes = (_b = options) === null || _b === void 0 ? void 0 : _b.episodes;
            if (episodes) {
                if (Array.isArray(episodes)) {
                    const episodeIds = episodes.map(episode => this.resolveId(episode));
                    // @ts-ignore
                    if (episodeIds)
                        return this._fetchMany(episodeIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new Error('No market was provided!');
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedEpisode = this.resolve(id);
                if (cachedEpisode)
                    return cachedEpisode;
            }
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.episodes(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    _fetchMany(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new Error('No market was provided!');
            const episodes = new Collection();
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedEpisodes = [];
                ids.forEach(id => {
                    const episode = this.resolve(id);
                    if (episode) {
                        episodes.set(episode.id, episode);
                        cachedEpisodes.push(id);
                    }
                });
                ids = ids.filter(id => !cachedEpisodes.includes(id));
            }
            const query = {
                ids,
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.episodes.get(requestData);
            data.episodes.forEach(episodeObject => {
                var _a;
                const episode = this.add((_a = episodeObject) === null || _a === void 0 ? void 0 : _a.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, episodeObject);
                episodes.set(episode.id, episode);
            });
            return episodes;
        });
    }
    /**
     * Fetches episodes from Spotify by searching
     * @param options The options provided for searching episodes
     * @returns A `Page` of `SimplifiedEpisode` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.market))
                throw new CustomTypeError('MISSING_MARKET');
            const data = yield _super._search.call(this, options, 'episode', options.market);
            return new Page(this.client, data.episodes, SimplifiedEpisode);
        });
    }
}
