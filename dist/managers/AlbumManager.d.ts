import Album from '../structures/Album.js';
import BaseManager from './BaseManager.js';
import SimplifiedTrack from '../structures/SimplifiedTrack.js';
import { Page } from '../structures/Misc.js';
import SimplifiedAlbum from '../structures/SimplifiedAlbum.js';
import type Client from '../client/Client.js';
import type { FetchAlbumOptions, FetchAlbumsOptions, FetchAlbumTracksOptions, FetchNewReleasesOptions, SearchAlbumsOptions } from '../typings/Interfaces.js';
import type { SimplifiedTrackObject, SimplifiedAlbumObject } from 'spotify-api-types';
import type { AlbumResolvable, FetchedAlbum } from '../typings/Types.js';
/**
 * Stores cache for albums and holds their API methods
 */
export default class AlbumManager extends BaseManager<AlbumResolvable, Album> {
    constructor(client: Client);
    /**
     * Resolves an AlbumResolvable to an Album object
     */
    resolve(albumResolvable: AlbumResolvable): Album | null;
    /**
     * Resolves an AlbumResolvable to an Album ID
     */
    resolveId(albumResolvable: AlbumResolvable): string | null;
    /**
     * Fetches album(s) from Spotify
     * @param options Options for fetching album(s)
     */
    fetch<T extends AlbumResolvable | FetchAlbumOptions | FetchAlbumsOptions>(options: T): Promise<FetchedAlbum<T> | null>;
    private _fetchSingle;
    private _fetchMany;
    /**
     * Fetches track(s) of an album
     * @param album The album whose tracks are to be fetched
     * @param options Options for fetching the tracks
     * @returns A Page of `SimplifiedTrack` objects as a Promise
     */
    fetchTracks(album: AlbumResolvable, options?: FetchAlbumTracksOptions): Promise<Page<SimplifiedTrackObject, SimplifiedTrack>>;
    /**
     * Fetches recently released albums
     * @param options Options for fetching new releases
     * @returns A Page of `SimplifiedAlbum` objects as a Promise
     */
    fetchNewReleases(options?: FetchNewReleasesOptions): Promise<Page<SimplifiedAlbumObject, SimplifiedAlbum>>;
    /**
     * Fetches albums from Spotify by searching
     * @param options The options provided for searching albums
     * @returns A `Page` of `SimplifiedAlbum` objects as a Promise
     */
    search(options: SearchAlbumsOptions): Promise<Page<SimplifiedAlbumObject, SimplifiedAlbum>>;
}
