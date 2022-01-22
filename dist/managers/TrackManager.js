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
import Track from '../structures/Track.js';
import { Page, Recommendation, RequestData } from '../structures/Misc.js';
import Collection from '../util/Collection.js';
import AudioFeatures from '../structures/AudioFeatures.js';
export default class TrackManager extends BaseManager {
    constructor(client) {
        super(client, Track);
    }
    /**
     * Resolves a TrackResolvable to a Track object
     */
    resolve(trackResolvable) {
        const track = super.resolve(trackResolvable);
        if (track)
            return track;
        const trackId = this.resolveId(trackResolvable);
        if (trackId)
            return super.resolve(trackId);
        return null;
    }
    /**
     * Resolves a TrackResolvable to a Track ID
     */
    resolveId(trackResolvable) {
        const trackId = super.resolveId(trackResolvable);
        if (trackId)
            return trackId;
        if (trackResolvable.id) {
            return trackResolvable.id;
        }
        return null;
    }
    /**
     * Fetches track(s) from Spotify
     */
    fetch(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No track IDs were provided');
            const trackId = this.resolveId(options);
            // @ts-ignore
            if (trackId)
                return this._fetchSingle(trackId);
            const track = (_a = options) === null || _a === void 0 ? void 0 : _a.track;
            if (track) {
                const trackId = this.resolveId(track);
                // @ts-ignore
                if (trackId)
                    return this._fetchSingle(trackId, options);
            }
            const tracks = (_b = options) === null || _b === void 0 ? void 0 : _b.tracks;
            if (tracks) {
                if (Array.isArray(tracks)) {
                    const trackIds = tracks.map(track => this.resolveId(track));
                    // @ts-ignore
                    if (trackIds)
                        return this._fetchMany(trackIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedTrack = this.resolve(id);
                if (cachedTrack)
                    return cachedTrack;
            }
            const query = {
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.tracks(id).get(requestData);
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
    _fetchMany(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracks = new Collection();
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedTracks = [];
                ids.forEach(id => {
                    const track = this.resolve(id);
                    if (track) {
                        tracks.set(track.id, track);
                        cachedTracks.push(id);
                    }
                });
                ids = ids.filter(id => !cachedTracks.includes(id));
            }
            const query = {
                ids,
                market: options === null || options === void 0 ? void 0 : options.market,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api.tracks.get(requestData);
            data.tracks.forEach(trackObject => {
                var _a;
                const track = this.add((_a = trackObject) === null || _a === void 0 ? void 0 : _a.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, trackObject);
                tracks.set(track.id, track);
            });
            return tracks;
        });
    }
    /**
     * Fetches audio features of a track
     * @param options Options for fetching audio features of a track
     * @returns An `AudioFeatures` object or an array of `AudioFeatures` as a Promise
     */
    fetchAudioFeatures(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('No tracks were provided');
            const trackId = this.resolveId(options);
            // @ts-ignore
            if (trackId)
                return this._fetchSingleAudioFeatures(trackId, options);
            const track = (_a = options) === null || _a === void 0 ? void 0 : _a.track;
            if (track) {
                const trackId = this.resolveId(track);
                // @ts-ignore
                if (trackId)
                    return this._fetchSingleAudioFeatures(trackId, options);
            }
            const tracks = options.tracks;
            if (tracks) {
                if (Array.isArray(tracks)) {
                    const trackIds = tracks.map(track => this.resolveId(track));
                    // @ts-ignore
                    if (trackIds)
                        return this._fetchManyAudioFeatures(trackIds, options);
                }
            }
            return null;
        });
    }
    _fetchSingleAudioFeatures(id, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const track = this.cache.get(id);
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck) && (track === null || track === void 0 ? void 0 : track.features))
                track.features;
            const data = yield this.client._api('audio-features', id).get();
            const audioFeatures = new AudioFeatures(this.client, data);
            if (((_a = options === null || options === void 0 ? void 0 : options.cacheAfterFetching) !== null && _a !== void 0 ? _a : true) && track) {
                track.features = audioFeatures;
            }
            return audioFeatures;
        });
    }
    _fetchManyAudioFeatures(ids, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioFeaturesList = [];
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedAudioFeaturesList = [];
                ids.forEach(id => {
                    const track = this.cache.get(id);
                    if (track && (track === null || track === void 0 ? void 0 : track.features)) {
                        audioFeaturesList.push(track.features);
                        cachedAudioFeaturesList.push(id);
                    }
                });
                ids = ids.filter(id => !cachedAudioFeaturesList.includes(id));
            }
            const query = {
                ids,
            };
            const requestData = new RequestData({ query });
            const data = yield this.client._api('audio-features').get(requestData);
            data.audio_features.forEach(audioFeaturesObject => {
                var _a;
                const audioFeatures = (audioFeaturesObject === null || audioFeaturesObject === void 0 ? void 0 : audioFeaturesObject.id) ? new AudioFeatures(this.client, audioFeaturesObject) : null;
                if (((_a = options === null || options === void 0 ? void 0 : options.cacheAfterFetching) !== null && _a !== void 0 ? _a : true) && audioFeatures) {
                    const track = this.cache.get(audioFeatures.id);
                    if (track)
                        track.features = audioFeatures;
                }
                audioFeaturesList.push(audioFeatures);
            });
            return audioFeaturesList;
        });
    }
    /**
     * Fetches recommended tracks on the basis of options provided
     * @param options The options for fetching recommendations
     * @returns A `Recommendation` object as a Promise
     */
    fetchRecommendations(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                limit: options === null || options === void 0 ? void 0 : options.limit,
                market: options === null || options === void 0 ? void 0 : options.market,
                seed_artists: [],
                seed_genres: [],
                seed_tracks: [],
                max_acousticness: (_a = options === null || options === void 0 ? void 0 : options.acousticness) === null || _a === void 0 ? void 0 : _a.max,
                min_acousticness: (_b = options === null || options === void 0 ? void 0 : options.acousticness) === null || _b === void 0 ? void 0 : _b.min,
                target_acousticness: (_c = options === null || options === void 0 ? void 0 : options.acousticness) === null || _c === void 0 ? void 0 : _c.target,
                max_danceability: (_d = options === null || options === void 0 ? void 0 : options.danceability) === null || _d === void 0 ? void 0 : _d.max,
                min_danceability: (_e = options === null || options === void 0 ? void 0 : options.danceability) === null || _e === void 0 ? void 0 : _e.min,
                target_danceability: (_f = options === null || options === void 0 ? void 0 : options.danceability) === null || _f === void 0 ? void 0 : _f.target,
                max_duration_ms: (_g = options === null || options === void 0 ? void 0 : options.duration) === null || _g === void 0 ? void 0 : _g.max,
                min_duration_ms: (_h = options === null || options === void 0 ? void 0 : options.duration) === null || _h === void 0 ? void 0 : _h.min,
                target_duration_ms: (_j = options === null || options === void 0 ? void 0 : options.duration) === null || _j === void 0 ? void 0 : _j.target,
                max_energy: (_k = options === null || options === void 0 ? void 0 : options.energy) === null || _k === void 0 ? void 0 : _k.max,
                min_energy: (_l = options === null || options === void 0 ? void 0 : options.energy) === null || _l === void 0 ? void 0 : _l.min,
                target_energy: (_m = options === null || options === void 0 ? void 0 : options.energy) === null || _m === void 0 ? void 0 : _m.target,
                max_instrumentalness: (_o = options === null || options === void 0 ? void 0 : options.instrumentalness) === null || _o === void 0 ? void 0 : _o.max,
                min_instrumentalness: (_p = options === null || options === void 0 ? void 0 : options.instrumentalness) === null || _p === void 0 ? void 0 : _p.min,
                target_instrumentalness: (_q = options === null || options === void 0 ? void 0 : options.instrumentalness) === null || _q === void 0 ? void 0 : _q.target,
                max_key: (_r = options === null || options === void 0 ? void 0 : options.key) === null || _r === void 0 ? void 0 : _r.max,
                min_key: (_s = options === null || options === void 0 ? void 0 : options.key) === null || _s === void 0 ? void 0 : _s.min,
                target_key: (_t = options === null || options === void 0 ? void 0 : options.key) === null || _t === void 0 ? void 0 : _t.target,
                max_liveness: (_u = options === null || options === void 0 ? void 0 : options.liveness) === null || _u === void 0 ? void 0 : _u.max,
                min_liveness: (_v = options === null || options === void 0 ? void 0 : options.liveness) === null || _v === void 0 ? void 0 : _v.min,
                target_liveness: (_w = options === null || options === void 0 ? void 0 : options.liveness) === null || _w === void 0 ? void 0 : _w.target,
                max_loudness: (_x = options === null || options === void 0 ? void 0 : options.loudness) === null || _x === void 0 ? void 0 : _x.max,
                min_loudness: (_y = options === null || options === void 0 ? void 0 : options.loudness) === null || _y === void 0 ? void 0 : _y.min,
                target_loudnes: (_z = options === null || options === void 0 ? void 0 : options.loudness) === null || _z === void 0 ? void 0 : _z.target,
                max_mode: (_0 = options === null || options === void 0 ? void 0 : options.mode) === null || _0 === void 0 ? void 0 : _0.max,
                min_mode: (_1 = options === null || options === void 0 ? void 0 : options.mode) === null || _1 === void 0 ? void 0 : _1.min,
                target_mode: (_2 = options === null || options === void 0 ? void 0 : options.mode) === null || _2 === void 0 ? void 0 : _2.target,
                max_popularity: (_3 = options === null || options === void 0 ? void 0 : options.popularity) === null || _3 === void 0 ? void 0 : _3.max,
                min_popularity: (_4 = options === null || options === void 0 ? void 0 : options.popularity) === null || _4 === void 0 ? void 0 : _4.min,
                target_popularity: (_5 = options === null || options === void 0 ? void 0 : options.popularity) === null || _5 === void 0 ? void 0 : _5.target,
                max_speechiness: (_6 = options === null || options === void 0 ? void 0 : options.speechiness) === null || _6 === void 0 ? void 0 : _6.max,
                min_speechiness: (_7 = options === null || options === void 0 ? void 0 : options.speechiness) === null || _7 === void 0 ? void 0 : _7.min,
                target_speechiness: (_8 = options === null || options === void 0 ? void 0 : options.speechiness) === null || _8 === void 0 ? void 0 : _8.target,
                max_tempo: (_9 = options === null || options === void 0 ? void 0 : options.tempo) === null || _9 === void 0 ? void 0 : _9.max,
                min_tempo: (_10 = options === null || options === void 0 ? void 0 : options.tempo) === null || _10 === void 0 ? void 0 : _10.min,
                target_tempo: (_11 = options === null || options === void 0 ? void 0 : options.tempo) === null || _11 === void 0 ? void 0 : _11.target,
                max_time_signature: (_12 = options === null || options === void 0 ? void 0 : options.timeSignature) === null || _12 === void 0 ? void 0 : _12.max,
                min_time_signature: (_13 = options === null || options === void 0 ? void 0 : options.timeSignature) === null || _13 === void 0 ? void 0 : _13.min,
                target_time_signature: (_14 = options === null || options === void 0 ? void 0 : options.timeSignature) === null || _14 === void 0 ? void 0 : _14.target,
                max_valence: (_15 = options === null || options === void 0 ? void 0 : options.valence) === null || _15 === void 0 ? void 0 : _15.max,
                min_valence: (_16 = options === null || options === void 0 ? void 0 : options.valence) === null || _16 === void 0 ? void 0 : _16.min,
                target_valence: (_17 = options === null || options === void 0 ? void 0 : options.valence) === null || _17 === void 0 ? void 0 : _17.target,
            };
            if (!(options === null || options === void 0 ? void 0 : options.seeds))
                throw new Error('No seeds were provided');
            options.seeds.forEach(seedData => {
                if ((seedData === null || seedData === void 0 ? void 0 : seedData.type) === 'ARTIST') {
                    const artistId = this.client.artists.resolveId(seedData.seed);
                    if (artistId)
                        query.seed_artists.push(artistId);
                }
                else if ((seedData === null || seedData === void 0 ? void 0 : seedData.type) === 'GENRE') {
                    const genre = seedData === null || seedData === void 0 ? void 0 : seedData.seed;
                    if (genre && typeof genre === 'string')
                        query.seed_genres.push(genre);
                }
                else if ((seedData === null || seedData === void 0 ? void 0 : seedData.type) === 'TRACK') {
                    const trackId = this.resolveId(seedData === null || seedData === void 0 ? void 0 : seedData.seed);
                    if (trackId)
                        query.seed_tracks.push(trackId);
                }
            });
            const { seed_artists, seed_genres, seed_tracks } = query;
            const totalSeeds = seed_artists.length + seed_genres.length + seed_tracks.length;
            if (totalSeeds < 1)
                throw new Error('Atleast one seed should be provided');
            if (totalSeeds > 5)
                throw new Error('Only upto 5 seeds can be provided');
            const requestData = new RequestData({ query });
            const data = yield this.client._api.recommendations.get(requestData);
            return new Recommendation(this.client, data);
        });
    }
    /**
     * Fetches tracks from Spotify by searching
     * @param options The options provided for searching tracks
     * @returns A `Page` of `Track` objects as a Promise
     */
    search(options) {
        const _super = Object.create(null, {
            _search: { get: () => super._search }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _super._search.call(this, options, 'track', options === null || options === void 0 ? void 0 : options.market);
            return new Page(this.client, data.tracks, Track);
        });
    }
}
