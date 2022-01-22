import SimplifiedTrack from './SimplifiedTrack.js';
import SimplifiedAlbum from './SimplifiedAlbum.js';
import { ExternalId } from './Misc.js';
export default class Track extends SimplifiedTrack {
    constructor(client, data) {
        super(client, data);
        this.album = new SimplifiedAlbum(this.client, data.album);
        this.externalIds = new ExternalId(data.external_ids);
        this.popularity = data.popularity;
        this.features = null;
    }
}
