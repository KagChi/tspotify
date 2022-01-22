import Client from '../client/Client.js';
import SimplifiedArtist from './SimplifiedArtist.js';
import { Followers, Image } from './Misc.js';
import type { ArtistObject } from 'spotify-api-types';
/**
 * Represents an artist on Spotify
 */
export default class Artist extends SimplifiedArtist {
    /**
     * Information about the followers of the artist
     */
    followers: Followers;
    /**
     * A list of the genres the artist is associated with
     */
    genres: Array<string>;
    /**
     * Images of the artist in various sizes, widest first
     */
    images: Array<Image>;
    /**
     * The popularity of the artist. The value will be between `0` and `100`, with `100` being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks
     */
    popularity: number;
    constructor(client: Client, data: ArtistObject);
    private _patchImages;
}
