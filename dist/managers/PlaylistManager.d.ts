import BaseManager from './BaseManager.js';
import Playlist from '../structures/Playlist.js';
import { Image, Page, PlaylistTrack } from '../structures/Misc.js';
import SimplifiedPlaylist from '../structures/SimplifiedPlaylist.js';
import type Client from '../client/Client.js';
import type { FetchPlaylistOptions, FetchUserPlaylistsOptions, FetchPlaylistItemsOptions, FetchFeaturedPlaylistsOptions, SearchPlaylistsOptions } from '../typings/Interfaces.js';
import type { PlaylistTrackObject, SimplifiedPlaylistObject } from 'spotify-api-types';
import type { PlaylistResolvable, UserResolvable } from '../typings/Types.js';
/**
 * Stores cache for playlists and holds their API methods
 */
export default class PlaylistManager extends BaseManager<PlaylistResolvable, Playlist> {
    constructor(client: Client);
    /**
     * Resolves a PlaylistResolavable to a Playlist
     * @param playlistResolvable A string or object that can be resolved to a Playlist
     * @returns A Playlist
     */
    resolve(playlistResolvable: PlaylistResolvable): Playlist | null;
    /**
     * Resolves a PlaylistResolvable to a Playlist ID
     * @param playlistResolvable A string or object that can be resolved to a Playlist
     * @returns The ID of a Playlist
     */
    resolveId(playlistResolvable: PlaylistResolvable): string | null;
    fetch(options: FetchPlaylistOptions): Promise<Playlist>;
    private _fetchSigle;
    /**
     * Fetches playlists of a user
     * @param user The user whose playlists are to be fetched
     * @param options Options for fetching the user's playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchUserPlaylists(user: UserResolvable, options?: FetchUserPlaylistsOptions): Promise<Page<SimplifiedPlaylistObject, SimplifiedPlaylist>>;
    /**
     * Fetches items of a playlist
     * @param options Options for fetching items of a playlist
     * @returns A Page of `PlaylistTrack` objects a Promise
     */
    fetchItems(options: FetchPlaylistItemsOptions): Promise<Page<PlaylistTrackObject, PlaylistTrack>>;
    /**
     * Fetches cover image of a playlist
     * @param playlist The playlist whose cover image is to be fetched
     * @returns An array of `Image` object
     */
    fetchCoverImage(playlist: PlaylistResolvable): Promise<Array<Image>>;
    /**
     * Fetches playlists that are featured by Spotify
     * @param options Options for fetching the featured playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchFeaturedPlaylists(options?: FetchFeaturedPlaylistsOptions): Promise<Page<SimplifiedPlaylistObject, SimplifiedPlaylist>>;
    /**
     * Fetches playlists from Spotify by searching
     * @param options The options provided for searching playlists
     * @returns A `Page` of `SimplifiedPlaylist` objects as a Promise
     */
    search(options: SearchPlaylistsOptions): Promise<Page<SimplifiedPlaylistObject, SimplifiedPlaylist>>;
}
