var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RequestData } from '../structures/Misc.js';
import Album from '../structures/Album.js';
import BaseManager from './BaseManager.js';
import Collection from '../util/Collection.js';
import SimplifiedTrack from '../structures/SimplifiedTrack.js';
import { Page } from '../structures/Misc.js';
import SimplifiedAlbum from '../structures/SimplifiedAlbum.js';
/**
 * Stores cache for albums and holds their API methods
 */
export default class AlbumManager extends BaseManager {
    constructor(client) {
        super(client, Album);
    }
    /**
     * Resolves an AlbumResolvable to an Album object
     */
    resolve(albumResolvable) {
        const album = super.resolve(albumResolvable);
        if (album)
            return album;
        const albumId = this.resolveId(albumResolvable);
        if (albumId)
            return super.resolve(albumId);
        return null;
    }
    /**
     * Resolves an AlbumResolvable to an Album ID
     */
    resolveId(albumResolvable) {
        const albumId = super.resolveId(albumResolvable);
        if (albumId)
            return albumId;
        if (albumResolvable.id) {
            return albumResolvable.id;
        }
        return null;
    }
    /**
     * Fetches album(s) from Spotify
     * @param options Options for fetching album(s)
     */
    fetch(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No album IDs were provided');
            const albumId = this.resolveId(options);
            // @ts-ignore
            if (albumId)
                return this._fetchSingle(albumId);
            const album = (_a = options) === null || _a === void 0 ? void 0 : _a.album;
            if (album) {
                const albumId = this.resolveId(album);
                // @ts-ignore
                if (albumId)
                    return this._fetchSingle(albumId, options);
            }
            const albums = (_b = options) === null || _b === void 0 ? void 0 : _b.albums;
            if (albums) {
                if (Array.isArray(albums)) {
                    const albumIds = albums.map(album => this.resolveId(album));
                    // @ts-ignore
                    if (albumIds)
                        return this._fetchMany(albumIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedAlbum = this.cache.get(id);
                if (cachedAlbum)
                    return cachedAlbum;
            }
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.albums(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    _fetchMany(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = new Collection();
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedAlbums = [];
                ids.forEach(id => {
                    const album = this.cache.get(id);
                    if (album) {
                        albums.set(album.id, album);
                        cachedAlbums.push(album.id);
                    }
                });
                ids = ids.filter(id => !cachedAlbums.includes(id));
            }
            const query = {
                ids,
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.albums.get(requestData);
            data.albums.forEach(albumObject => {
                const album = this.add(albumObject.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, albumObject);
                albums.set(album.id, album);
            });
            return albums;
        });
    }
    /**
     * Fetches track(s) of an album
     * @param album The album whose tracks are to be fetched
     * @param options Options for fetching the tracks
     * @returns A Page of `SimplifiedTrack` objects as a Promise
     */
    fetchTracks(album, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumId = this.resolveId(album);
            if (!albumId)
                throw new Error('No album IDs were provided!');
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.albums(albumId).tracks.get(requestData);
            return new Page(this.client, data, SimplifiedTrack);
        });
    }
    /**
     * Fetches recently released albums
     * @param options Options for fetching new releases
     * @returns A Page of `SimplifiedAlbum` objects as a Promise
     */
    fetchNewReleases(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                country: options === null || options === void 0 ? void 0 : options.country,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.browse('new-releases').get(requestData);
            return new Page(this.client, data.albums, SimplifiedAlbum);
        });
    }
    /**
     * Fetches albums from Spotify by searching
     * @param options The options provided for searching albums
     * @returns A `Page` of `SimplifiedAlbum` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super._search.call(this, options, 'album', options === null || options === void 0 ? void 0 : options.market);
            return new Page(this.client, data.albums, SimplifiedAlbum);
        });
    }
}
