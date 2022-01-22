import BasePlaylist from './BasePlaylist.js';
import { PlaylistTrack } from './Misc.js';
import { Page } from './Misc.js';
export default class Playlist extends BasePlaylist {
    constructor(client, data) {
        super(client, data);
        this.tracks = new Page(this.client, data.tracks, PlaylistTrack);
    }
}
