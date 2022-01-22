import BasePlaylist from './BasePlaylist.js';
import { PlaylistTracksRef } from './Misc.js';
export default class SimplifiedPlaylist extends BasePlaylist {
    constructor(client, data) {
        super(client, data);
        this.tracks = new PlaylistTracksRef(data.tracks);
    }
}
