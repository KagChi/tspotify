import Track from './Track.js';
import Episode from './Episode.js';
import PublicUser from './PublicUser.js';
import Collection from '../util/Collection.js';
import SimplifiedTrack from './SimplifiedTrack.js';
/**
 * The details about the access token returned by the API after logging in
 */
export class AccessTokenDetails {
    constructor(data) {
        this.accessToken = data.access_token;
        this.tokenType = data.token_type;
        this.expiresIn = data.expires_in;
    }
}
export class BaseRestriction {
    constructor(data) {
        this.reason = data.reason;
    }
}
export class AlbumRestriction extends BaseRestriction {
    constructor(data) {
        super(data);
    }
}
export class EpisodeRestriction extends BaseRestriction {
    constructor(data) {
        super(data);
    }
}
export class TrackRestriction extends BaseRestriction {
    constructor(data) {
        super(data);
    }
}
/**
 * Data used for generating an API request
 */
export class RequestData {
    constructor(data) {
        this.useAccounts = data.useAccounts;
        this.query = data.query;
        this.body = data.body;
    }
}
/**
 * Holds copyright details for a content on Spotify
 */
export class Copyright {
    constructor(data) {
        this.text = data.text;
        this.type = data.type;
    }
}
/**
 * Holds details about external IDs of a content
 */
export class ExternalId {
    constructor(data) {
        this.ean = data.ean;
        this.isrc = data.isrc;
        this.upc = data.upc;
    }
}
/**
 * Holds the Spotify URL for the content
 */
export class ExternalUrl {
    constructor(data) {
        this.spotify = data.spotify;
    }
}
export class ExplicitContentSettings {
    constructor(data) {
        this.filterEnabled = data.filter_enabled;
        this.filterLocked = data.filter_locked;
    }
}
export class Followers {
    constructor(data) {
        this.href = data.href;
        this.total = data.total;
    }
}
export class Image {
    constructor(data) {
        var _a, _b;
        this.height = (_a = data === null || data === void 0 ? void 0 : data.height) !== null && _a !== void 0 ? _a : null;
        this.url = data.url;
        this.width = (_b = data === null || data === void 0 ? void 0 : data.width) !== null && _b !== void 0 ? _b : null;
    }
}
export class Page {
    constructor(client, data, structureType) {
        Object.defineProperty(this, '_holds', { writable: true });
        this._holds = structureType;
        Object.defineProperty(this, 'client', { writable: true });
        this.client = client;
        this.href = data.href;
        this.items = this._patchItems(data.items);
        this.limit = data.limit;
        this.next = data.next;
        this.offset = data.offset;
        this.previous = data.previous;
        this.total = data.total;
    }
    _patchItems(data) {
        const patchedItems = new Collection();
        data.forEach(item => {
            var _a;
            // @ts-ignore
            patchedItems.set((_a = item === null || item === void 0 ? void 0 : item.id) !== null && _a !== void 0 ? _a : item.track.id, new this._holds(this.client, item));
        });
        return patchedItems;
    }
}
export class PlaylistTrack {
    constructor(client, data) {
        var _a;
        this.addedAt = data.added_at;
        this.addedBy = ((_a = data.added_by) === null || _a === void 0 ? void 0 : _a.id) ? new PublicUser(client, data.added_by) : null;
        this.isLocal = data.is_local;
        this.track =
            data.track.type === 'track'
                ? new Track(client, data.track)
                : new Episode(client, data.track);
    }
}
export class PlaylistTracksRef {
    constructor(data) {
        this.href = data.href;
        this.total = data.total;
    }
}
export class RecommendationSeed {
    constructor(data) {
        this.afterFilteringSize = data.afterFilteringSize;
        this.afterRelinkingSize = data.afterRelinkingSize;
        this.href = data.href;
        this.id = data.id;
        this.initialPoolSize = data.initialPoolSize;
        this.type = data.type;
    }
}
export class Recommendation {
    constructor(client, data) {
        Object.defineProperty(this, 'client', { writable: true });
        this.client = client;
        this.seeds = this._patchSeeds(data.seeds);
        this.tracks = this._patchTracks(data.tracks);
    }
    _patchSeeds(data) {
        const patchedSeeds = [];
        data.forEach(recommendationSeedObject => {
            patchedSeeds.push(new RecommendationSeed(recommendationSeedObject));
        });
        return patchedSeeds;
    }
    _patchTracks(data) {
        const patchedTracks = new Collection();
        data.forEach(simplifiedTrackObject => {
            patchedTracks.set(simplifiedTrackObject.id, new SimplifiedTrack(this.client, simplifiedTrackObject));
        });
        return patchedTracks;
    }
}
