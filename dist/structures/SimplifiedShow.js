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
import { ExternalUrl, Image } from './Misc.js';
export default class SimplifiedShow extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.description = data.description;
        this.explicit = data.explicit;
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.href = data.href;
        this.images = this._patchImages(data.images);
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.rawObjectType = data.type;
        this.uri = data.uri;
    }
    _patchImages(data) {
        const imagesArray = [];
        data.forEach(imageObject => {
            imagesArray.push(new Image(imageObject));
        });
        return imagesArray;
    }
    /**
     * Fetches episodes of this show
     * @param options The options for fetching episodes of this show
     * @returns A Page of `SimplifiedEpisode` objects as a Promise
     */
    fetchEpisodes(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.shows.fetchEpisodes(this.id, options);
        });
    }
}
