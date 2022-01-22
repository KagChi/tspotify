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
import Playlist from '../structures/Playlist.js';
import { Image, Page, PlaylistTrack, RequestData } from '../structures/Misc.js';
import SimplifiedPlaylist from '../structures/SimplifiedPlaylist.js';
/**
 * Stores cache for playlists and holds their API methods
 */
export default class PlaylistManager extends BaseManager {
    constructor(client) {
        super(client, Playlist);
    }
    /**
     * Resolves a PlaylistResolavable to a Playlist
     * @param playlistResolvable A string or object that can be resolved to a Playlist
     * @returns A Playlist
     */
    resolve(playlistResolvable) {
        const playlist = super.resolve(playlistResolvable);
        if (playlist)
            return playlist;
        const playlistId = this.resolveId(playlistResolvable);
        if (playlistId)
            return super.resolve(playlistId);
        return null;
    }
    /**
     * Resolves a PlaylistResolvable to a Playlist ID
     * @param playlistResolvable A string or object that can be resolved to a Playlist
     * @returns The ID of a Playlist
     */
    resolveId(playlistResolvable) {
        const playlistId = super.resolveId(playlistResolvable);
        if (playlistId)
            return playlistId;
        if (playlistResolvable.id) {
            return playlistResolvable.id;
        }
        return null;
    }
    fetch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('Provide valid options');
            const playlistId = this.resolveId(options === null || options === void 0 ? void 0 : options.playlist);
            if (!playlistId)
                throw new Error('Invalid playlist');
            return this._fetchSigle(playlistId, options);
        });
    }
    _fetchSigle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedPlaylist = this.cache.get(id);
                if (cachedPlaylist)
                    return cachedPlaylist;
            }
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
                additional_types: 'episode',
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.playlists(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    /**
     * Fetches playlists of a user
     * @param user The user whose playlists are to be fetched
     * @param options Options for fetching the user's playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchUserPlaylists(user, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.client.users.resolveId(user);
            if (!userId)
                throw new Error('Invalid user');
            const query = {
                limit: options === null || options === void 0 ? void 0 : options.limit,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.users(userId).playlists.get(requestData);
            return new Page(this.client, data, SimplifiedPlaylist);
        });
    }
    /**
     * Fetches items of a playlist
     * @param options Options for fetching items of a playlist
     * @returns A Page of `PlaylistTrack` objects a Promise
     */
    fetchItems(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = this.resolveId(options === null || options === void 0 ? void 0 : options.playlist);
            if (!playlistId)
                throw new Error('Invalid playlist');
            const query = {
                limit: options === null || options === void 0 ? void 0 : options.limit,
                market: options === null || options === void 0 ? void 0 : options.market,
                offset: options === null || options === void 0 ? void 0 : options.offset,
                additional_types: 'episode',
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.playlists(playlistId).tracks.get(requestData);
            return new Page(this.client, data, PlaylistTrack);
        });
    }
    /**
     * Fetches cover image of a playlist
     * @param playlist The playlist whose cover image is to be fetched
     * @returns An array of `Image` object
     */
    fetchCoverImage(playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = this.resolveId(playlist);
            if (!playlistId)
                throw new Error('Invalid Playlist');
            const data = yield this.client._api.playlists(playlistId).images.get();
            const images = [];
            data.forEach(imageObject => {
                images.push(new Image(imageObject));
            });
            return images;
        });
    }
    /**
     * Fetches playlists that are featured by Spotify
     * @param options Options for fetching the featured playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchFeaturedPlaylists(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                country: options === null || options === void 0 ? void 0 : options.country,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                locale: options === null || options === void 0 ? void 0 : options.locale,
                offset: options === null || options === void 0 ? void 0 : options.offset,
                timestamp: options === null || options === void 0 ? void 0 : options.timestamp,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.browse('featured-playlists').get(requestData);
            return new Page(this.client, data.playlists, SimplifiedPlaylist);
        });
    }
    /**
     * Fetches playlists from Spotify by searching
     * @param options The options provided for searching playlists
     * @returns A `Page` of `SimplifiedPlaylist` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super._search.call(this, options, 'playlist', options === null || options === void 0 ? void 0 : options.market);
            return new Page(this.client, data.playlists, SimplifiedPlaylist);
        });
    }
}
