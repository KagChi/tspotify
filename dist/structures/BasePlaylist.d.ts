import PublicUser from './PublicUser.js';
import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Image } from './Misc.js';
import type Client from '../client/Client.js';
import type { SimplifiedPlaylistObject, PlaylistObject } from 'spotify-api-types';
export default class BasePlaylist extends BaseStructure {
    /**
     *  Whether the owner allows other users to modify the playlist
     */
    collaborative: boolean;
    /**
     * The playlist description
     */
    description: string | null;
    /**
     * Known external URLs for this playlist
     */
    externalUrls: ExternalUrl;
    /**
     * A link to the Web API endpoint providing full details of the playlist
     */
    href: string;
    /**
     * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order
     *
     * **⚠️Note**: If returned, the source URL for the image (url) is temporary and will expire in less than a day
     */
    images: Array<Image>;
    /**
     * The name of the playlist
     */
    name: string;
    /**
     * The user who owns the playlist
     */
    owner: PublicUser;
    /**
     * Whether the playlist is public or not
     *
     * **⚠️Note**: This would be `null` if the playlist status is not relevant
     */
    public: boolean | null;
    /**
     * The version identifier for the current playlist
     */
    snapshotId: string;
    /**
     * The raw object type returned by the API: `playlist`
     */
    rawObjectType: string;
    /**
     * The Spotify URI for the playlist
     */
    uri: string;
    constructor(client: Client, data: PlaylistObject | SimplifiedPlaylistObject);
    private _patchImages;
}
