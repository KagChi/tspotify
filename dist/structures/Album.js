import BaseAlbum from './BaseAlbum.js';
import SimplifiedTrack from './SimplifiedTrack.js';
import { Copyright, ExternalId } from './Misc.js';
import { Page } from './Misc.js';
/**
 * Represents an album on Spotify
 */
export default class Album extends BaseAlbum {
    constructor(client, data) {
        super(client, data);
        this.copyrights = this._patchCopyrights(data.copyrights);
        this.externalIds = new ExternalId(data.external_ids);
        this.genres = data.genres;
        this.label = data.label;
        this.popularity = data.popularity;
        this.tracks = new Page(this.client, data.tracks, SimplifiedTrack);
    }
    _patchCopyrights(data) {
        const copyrightArray = [];
        data.forEach(copyrightObject => {
            copyrightArray.push(new Copyright(copyrightObject));
        });
        return copyrightArray;
    }
}
