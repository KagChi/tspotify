import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Followers, Image } from './Misc.js';
export default class PublicUser extends BaseStructure {
    constructor(client, data) {
        var _a;
        super(client, data.id);
        this.displayName = (_a = data.display_name) !== null && _a !== void 0 ? _a : null;
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.followers = data.followers ? new Followers(data.followers) : null;
        this.href = data.href;
        this.images = data.images ? this._patchImages(data.images) : null;
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
