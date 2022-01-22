import BaseAlbum from './BaseAlbum.js';
import type Client from '../client/Client.js';
import type { SimplifiedAlbumObject, AlbumGroupType } from 'spotify-api-types';
export default class SimplifiedAlbum extends BaseAlbum {
    /**
     * Only present when getting an artist’s albums. Compare to `type` of `album` this field represents relationship between the `artist` and the `album`
     */
    albumGroup: AlbumGroupType | null;
    constructor(client: Client, data: SimplifiedAlbumObject);
}
