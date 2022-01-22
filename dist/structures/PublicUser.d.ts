import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Followers, Image } from './Misc.js';
import type Client from '../client/Client.js';
import type { PublicUserObject } from 'spotify-api-types';
export default class PublicUser extends BaseStructure {
    /**
     * The name displayed on the user’s profile
     */
    displayName: string | null;
    /**
     * Known public external URLs for this user
     */
    externalUrls: ExternalUrl;
    /**
     * Information about the followers of this user
     */
    followers: Followers | null;
    /**
     * A link to the Web API endpoint for this user
     */
    href: string;
    /**
     * The user’s profile image
     */
    images: Array<Image> | null;
    /**
     * The raw object type returned by the api: `user`
     */
    rawObjectType: string;
    /**
     * The Spotify URI for this user
     */
    uri: string;
    constructor(client: Client, data: PublicUserObject);
    private _patchImages;
}
