var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseStructure from './BaseStructure.js';
import SimplifiedArtist from './SimplifiedArtist.js';
import { ExternalUrl, Image, AlbumRestriction } from './Misc.js';
import Collection from '../util/Collection.js';
/**
 * Base class for all album-like structures
 */
export default class BaseAlbum extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.type = data.album_type;
        this.artists = this._patchArtists(data.artists);
        this.availableMarkets = data.available_markets;
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.href = data.href;
        this.images = this._patchImages(data.images);
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = (data === null || data === void 0 ? void 0 : data.restrictions) ? new AlbumRestriction(data === null || data === void 0 ? void 0 : data.restrictions) : null;
        this.rawObjectType = data.type;
        this.uri = data.uri;
    }
    _patchArtists(data) {
        const artistsCollection = new Collection();
        data.forEach(artistObject => {
            artistsCollection.set(artistObject.id, new SimplifiedArtist(this.client, artistObject));
        });
        return artistsCollection;
    }
    _patchImages(data) {
        const imagesArray = [];
        data.forEach(imageObject => {
            imagesArray.push(new Image(imageObject));
        });
        return imagesArray;
    }
    /**
     * Fetches tracks of this album
     * @param options The options for fetching tracks of this album
     * @returns A Page of `SimplifiedTrack` objects as a Promise
     */
    fetchTracks(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.albums.fetchTracks(this.id, options);
        });
    }
}
