import LinkedTrack from './LinkedTrack.js';
import SimplifiedArtist from './SimplifiedArtist.js';
import Collection from '../util/Collection.js';
import { TrackRestriction } from './Misc.js';
export default class SimplifiedTrack extends LinkedTrack {
    constructor(client, data) {
        var _a, _b;
        super(client, data);
        this.artists = this._patchArtists(data.artists);
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.isLocal = data.is_local;
        this.isPlayable = (_a = data === null || data === void 0 ? void 0 : data.is_playable) !== null && _a !== void 0 ? _a : null;
        this.linkedFrom = (data === null || data === void 0 ? void 0 : data.linked_from) ? new LinkedTrack(this.client, data.linked_from) : null;
        this.name = data.name;
        this.previewUrl = (_b = data === null || data === void 0 ? void 0 : data.preview_url) !== null && _b !== void 0 ? _b : null;
        this.restrictions = (data === null || data === void 0 ? void 0 : data.restrictions) ? new TrackRestriction(data === null || data === void 0 ? void 0 : data.restrictions) : null;
        this.trackNumber = data.track_number;
    }
    _patchArtists(data) {
        const artistsCollection = new Collection();
        data.forEach(artistObject => {
            artistsCollection.set(artistObject.id, new SimplifiedArtist(this.client, artistObject));
        });
        return artistsCollection;
    }
}
