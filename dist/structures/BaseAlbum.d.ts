import BaseStructure from './BaseStructure.js';
import SimplifiedArtist from './SimplifiedArtist.js';
import Client from '../client/Client.js';
import { ExternalUrl, Image, AlbumRestriction } from './Misc.js';
import Collection from '../util/Collection.js';
import SimplifiedTrack from './SimplifiedTrack.js';
import type { Page } from './Misc.js';
import type { AlbumObject, SimplifiedAlbumObject, SimplifiedTrackObject } from 'spotify-api-types';
import type { FetchAlbumTracksOptions } from '../typings/Interfaces.js';
/**
 * Base class for all album-like structures
 */
export default class BaseAlbum extends BaseStructure {
    /**
     * The type of the album
     */
    type: string;
    /**
     * The artists of the album
     */
    artists: Collection<string, SimplifiedArtist>;
    /**
     * The markets in which the album is available
     */
    availableMarkets: Array<string>;
    /**
     * Known external URLs for the album
     */
    externalUrls: ExternalUrl;
    /**
     * A link to the Web API endpoint providing full details of the album
     */
    href: string;
    /**
     * The cover art for the album in various sizes, widest first
     */
    images: Array<Image>;
    /**
     * The name of the album
     */
    name: string;
    /**
     * The date the album was first released, for example `1981-12-15`. Depending on the precision, it might be shown as `1981` or `1981-12`
     */
    releaseDate: string;
    /**
     * The precision with which `releaseDate` value is known: `year`, `month`, or `day`
     */
    releaseDatePrecision: string;
    /**
     * Included in the response when a content restriction is applied
     */
    restrictions: AlbumRestriction | null;
    /**
     * The raw object type returned by the api: `album`
     */
    rawObjectType: string;
    /**
     * The Spotify URI for the album
     */
    uri: string;
    constructor(client: Client, data: AlbumObject | SimplifiedAlbumObject);
    private _patchArtists;
    private _patchImages;
    /**
     * Fetches tracks of this album
     * @param options The options for fetching tracks of this album
     * @returns A Page of `SimplifiedTrack` objects as a Promise
     */
    fetchTracks(options?: FetchAlbumTracksOptions): Promise<Page<SimplifiedTrackObject, SimplifiedTrack>>;
}
