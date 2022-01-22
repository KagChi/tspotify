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
import { ExternalUrl } from './Misc.js';
export default class SimplifiedArtist extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.href = data.href;
        this.name = data.name;
        this.rawObjectType = data.type;
        this.uri = data.uri;
    }
    /**
     * Fetches top ten tracks of the artist from a given market
     * @param market The market to consider for the top tracks
     * @returns A collection of `Track` objects as a Promise
     */
    fetchTopTracks(market) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.artists.fetchTopTracks(this.id, market);
        });
    }
    /**
     * Fetches artists similar to the artist
     * @returns A collection of `Artist` objects as a Promise
     */
    fetchRelatedArtist() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.artists.fetchRelatedArtist(this.id);
        });
    }
    /**
     * Fetches albums of the artist
     * @param options Options for fetching the albums
     * @returns A Page of `SimplifiedAlbum` objects as a Promise
     */
    fetchAlbums(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.artists.fetchAlbums(this.id, options);
        });
    }
}
