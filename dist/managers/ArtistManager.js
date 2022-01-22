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
import Artist from '../structures/Artist.js';
import { RequestData } from '../structures/Misc.js';
import Collection from '../util/Collection.js';
import Track from '../structures/Track.js';
import SimplifiedAlbum from '../structures/SimplifiedAlbum.js';
import { Page } from '../structures/Misc.js';
/**
 * Stores cache for artists and holds their API methods
 */
export default class ArtistManager extends BaseManager {
    constructor(client) {
        super(client, Artist);
    }
    /**
     * Resolves an ArtistResolvable to an Artist object
     */
    resolve(artistResolvable) {
        const artist = super.resolve(artistResolvable);
        if (artist)
            return artist;
        const artistId = this.resolveId(artistResolvable);
        if (artistId)
            return super.resolve(artistId);
        return null;
    }
    /**
     * Resolves an ArtistResolvable to an Artist ID
     */
    resolveId(artistResolvable) {
        const artistId = super.resolveId(artistResolvable);
        if (artistId)
            return artistId;
        if (artistResolvable.id) {
            return artistResolvable.id;
        }
        return null;
    }
    /**
     * Fetches artist(s) from Spotify
     */
    fetch(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No artist IDs were provided');
            const artistId = this.resolveId(options);
            // @ts-ignore
            if (artistId)
                return this._fetchSingle(artistId);
            const artist = (_a = options) === null || _a === void 0 ? void 0 : _a.artist;
            if (artist) {
                const artistId = this.resolveId(artist);
                // @ts-ignore
                if (artistId)
                    return this._fetchSingle(artistId, options);
            }
            const artists = (_b = options) === null || _b === void 0 ? void 0 : _b.artists;
            if (artists) {
                if (Array.isArray(artists)) {
                    const artistIds = artists.map(artist => this.resolveId(artist));
                    // @ts-ignore
                    if (artistIds)
                        return this._fetchMany(artistIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedArtist = this.cache.get(id);
                if (cachedArtist)
                    return cachedArtist;
            }
            const data = yield this.client._api.artists(id).get();
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    _fetchMany(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = new Collection();
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedArtists = [];
                ids.forEach(id => {
                    const artist = this.cache.get(id);
                    if (artist) {
                        artists.set(artist.id, artist);
                        cachedArtists.push(id);
                    }
                });
                ids = ids.filter(id => !cachedArtists.includes(id));
            }
            const query = {
                ids,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.artists.get(requestData);
            data.artists.forEach(artistObject => {
                const artist = this.add(artistObject.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, artistObject);
                artists.set(artist.id, artist);
            });
            return artists;
        });
    }
    /**
     * Fetches top ten tracks of an artist from a given market
     * @param artist The artist whose top tracks are to be fetched
     * @param market The market to consider for the top tracks
     * @returns A collection of `Track` objects as a Promise
     */
    fetchTopTracks(artist, market) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!market || typeof market !== 'string')
                throw new Error('Invalid market');
            const artistId = this.resolveId(artist);
            if (!artistId)
                throw new Error('Invalid artist');
            const query = {
                market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.artists(artistId, 'top-tracks').get(requestData);
            const tracks = new Collection();
            data.tracks.forEach(trackObject => {
                const track = new Track(this.client, trackObject);
                tracks.set(track.id, track);
            });
            return tracks;
        });
    }
    /**
     * Fetches artists similar to a given artist
     * @param artist The artist whose relation are to be fetched
     * @returns A collection of `Artist` objects as a Promise
     */
    fetchRelatedArtist(artist) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = this.resolveId(artist);
            if (!artistId)
                throw new Error('Invalid artist');
            const data = yield this.client._api.artists(artistId, 'related-artists').get();
            const artists = new Collection();
            data.artists.forEach(artistObject => {
                const artist = new Artist(this.client, artistObject);
                artists.set(artist.id, artist);
            });
            return artists;
        });
    }
    /**
     * Fetches albums of an artist
     * @param artist The artist whose albums are to be fetched
     * @param options Options for fetching the albums
     * @returns A Page of `SimplifiedAlbum` objects as a Promise
     */
    fetchAlbums(artist, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = this.resolveId(artist);
            if (!artistId)
                throw new Error('Invalid artist');
            const query = {
                include_groups: options === null || options === void 0 ? void 0 : options.includeGroups,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                market: options === null || options === void 0 ? void 0 : options.market,
                offset: options === null || options === void 0 ? void 0 : options.offset,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.artists(artistId).albums.get(requestData);
            return new Page(this.client, data, SimplifiedAlbum);
        });
    }
    /**
     * Fetches artists from Spotify by searching
     * @param options The options provided for searching artists
     * @returns A `Page` of `Artist` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super._search.call(this, options, 'artist', options === null || options === void 0 ? void 0 : options.market);
            return new Page(this.client, data.artists, Artist);
        });
    }
}
