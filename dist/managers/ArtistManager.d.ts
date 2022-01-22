import BaseManager from './BaseManager.js';
import Artist from '../structures/Artist.js';
import Collection from '../util/Collection.js';
import Track from '../structures/Track.js';
import SimplifiedAlbum from '../structures/SimplifiedAlbum.js';
import { Page } from '../structures/Misc.js';
import type Client from '../client/Client.js';
import type { FetchArtistOptions, FetchArtistsOptions, FetchArtistAlbumsOptions, SearchArtistsOptions } from '../typings/Interfaces.js';
import type { ArtistObject, SimplifiedAlbumObject } from 'spotify-api-types';
import type { ArtistResolvable, FetchedArtist } from '../typings/Types.js';
/**
 * Stores cache for artists and holds their API methods
 */
export default class ArtistManager extends BaseManager<ArtistResolvable, Artist> {
    constructor(client: Client);
    /**
     * Resolves an ArtistResolvable to an Artist object
     */
    resolve(artistResolvable: ArtistResolvable): Artist | null;
    /**
     * Resolves an ArtistResolvable to an Artist ID
     */
    resolveId(artistResolvable: ArtistResolvable): string | null;
    /**
     * Fetches artist(s) from Spotify
     */
    fetch<T extends ArtistResolvable | FetchArtistOptions | FetchArtistsOptions>(options: T): Promise<FetchedArtist<T> | null>;
    private _fetchSingle;
    private _fetchMany;
    /**
     * Fetches top ten tracks of an artist from a given market
     * @param artist The artist whose top tracks are to be fetched
     * @param market The market to consider for the top tracks
     * @returns A collection of `Track` objects as a Promise
     */
    fetchTopTracks(artist: ArtistResolvable, market: string): Promise<Collection<string, Track>>;
    /**
     * Fetches artists similar to a given artist
     * @param artist The artist whose relation are to be fetched
     * @returns A collection of `Artist` objects as a Promise
     */
    fetchRelatedArtist(artist: ArtistResolvable): Promise<Collection<string, Artist>>;
    /**
     * Fetches albums of an artist
     * @param artist The artist whose albums are to be fetched
     * @param options Options for fetching the albums
     * @returns A Page of `SimplifiedAlbum` objects as a Promise
     */
    fetchAlbums(artist: ArtistResolvable, options?: FetchArtistAlbumsOptions): Promise<Page<SimplifiedAlbumObject, SimplifiedAlbum>>;
    /**
     * Fetches artists from Spotify by searching
     * @param options The options provided for searching artists
     * @returns A `Page` of `Artist` objects as a Promise
     */
    search(options: SearchArtistsOptions): Promise<Page<ArtistObject, Artist>>;
}
