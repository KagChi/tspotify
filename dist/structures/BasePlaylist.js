import PublicUser from './PublicUser.js';
import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Image } from './Misc.js';
export default class BasePlaylist extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = new ExternalUrl(data.external_urls);
        this.href = data.href;
        this.images = this._patchImages(data.images);
        this.name = data.name;
        this.owner = new PublicUser(client, data.owner);
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
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
