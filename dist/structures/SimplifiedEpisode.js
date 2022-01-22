import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Image, EpisodeRestriction } from './Misc.js';
export default class SimplifiedEpisode extends BaseStructure {
    constructor(client, data) {
        var _a;
        super(client, data.id);
        this.audioPreviewUrl = (_a = data === null || data === void 0 ? void 0 : data.audio_preview_url) !== null && _a !== void 0 ? _a : null;
        this.description = data.description;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.href = data.href;
        this.htmlDescription = data.html_description;
        this.images = this._patchImages(data.images);
        this.isExternallyHosted = data.is_externally_hosted;
        this.isPlayable = data.is_playable;
        this.language = data.language;
        this.languages = data.languages;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = (data === null || data === void 0 ? void 0 : data.restrictions) ? new EpisodeRestriction(data === null || data === void 0 ? void 0 : data.restrictions) : null;
        this.resumePoint = data.resume_point;
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
}
