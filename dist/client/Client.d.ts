import BaseClient from './BaseClient.js';
import RESTManager from '../rest/RESTManager.js';
import { AccessTokenDetails } from '../structures/Misc.js';
import AlbumManager from '../managers/AlbumManager.js';
import ArtistManager from '../managers/ArtistManager.js';
import TrackManager from '../managers/TrackManager.js';
import EpisodeManager from '../managers/EpisodeManager.js';
import ShowManager from '../managers/ShowManager.js';
import UserManager from '../managers/UserManager.js';
import PlaylistManager from '../managers/PlaylistManager.js';
import CategoryManager from '../managers/CategoryManager.js';
import type { ClientCredentials, ClientOptions } from '../typings/Interfaces.js';
/**
 * The core of the library
 */
export default class Client extends BaseClient {
    /**
     * The credentials for the client to login with
     */
    credentials: ClientCredentials | null;
    /**
     * The details about the access token returned by the API after authorization
     */
    accessTokenDetails: AccessTokenDetails | null;
    /**
     * The rest manager class that holds the methods for API calls
     */
    rest: RESTManager;
    /**
     * The album nanager class that holds the cache of albums and their methods
     */
    albums: AlbumManager;
    /**
     * Time at which the client became `ready`
     */
    readyAt: Date | null;
    /**
     * The manager class that holds cache and API methods of artists
     */
    artists: ArtistManager;
    /**
     * The manager class that holds cache and API methods of tracks
     */
    tracks: TrackManager;
    /**
     * The manager class that holds cache and API methods of episodes
     */
    episodes: EpisodeManager;
    /**
     * The manager class that holds cache and API methods of shows
     */
    shows: ShowManager;
    /**
     * The manager class that holds cache and API methods of users
     */
    users: UserManager;
    /**
     * The manager class that holds cache and API methods of playlists
     */
    playlists: PlaylistManager;
    /**
     * The manager class that holds cache and API methods of categories
     */
    categories: CategoryManager;
    /**
     * Time at which the client last updated the access token
     */
    lastTokenUpdateAt: Date | null;
    constructor(options?: ClientOptions);
    get _api(): any;
    /**
     * Logs in the client and emits `ready` event on success
     * @param credentials The credentials that were used to log in the bot
     * @returns An `AccessTokenDetails` object
     */
    login(credentials: ClientCredentials): Promise<AccessTokenDetails>;
    /**
     * Updates the access token by making a brand new `Client Credentials Flow` authorization request
     * and emits `accessTokenUpdate` event on success
     * @returns An `AccessTokenDetails` object
     */
    _updateAccessToken(): Promise<AccessTokenDetails>;
    /**
     * Fetches a list of markets where Spotify is available
     * @returns An array of `ISO 3166-1 alpha-2` strings as a Promise
     */
    fetchAvailableMarkets(): Promise<Array<string>>;
    /**
     * Fetches a list of available genres
     * @returns An array of genre strings as a Promise
     */
    fetchRecommendationGenres(): Promise<Array<string>>;
}
