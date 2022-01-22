var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseClient from './BaseClient.js';
import RESTManager from '../rest/RESTManager.js';
import { RequestData, AccessTokenDetails } from '../structures/Misc.js';
import AlbumManager from '../managers/AlbumManager.js';
import ArtistManager from '../managers/ArtistManager.js';
import TrackManager from '../managers/TrackManager.js';
import EpisodeManager from '../managers/EpisodeManager.js';
import ShowManager from '../managers/ShowManager.js';
import UserManager from '../managers/UserManager.js';
import PlaylistManager from '../managers/PlaylistManager.js';
import { Events } from '../util/Constants.js';
import CategoryManager from '../managers/CategoryManager.js';
/**
 * The core of the library
 */
export default class Client extends BaseClient {
    constructor(options) {
        super(options);
        Object.defineProperty(this, 'credentials', { writable: true });
        this.credentials = null;
        Object.defineProperty(this, 'accessTokenDetails', { writable: true });
        this.accessTokenDetails = null;
        this.rest = new RESTManager(this);
        this.albums = new AlbumManager(this);
        this.readyAt = null;
        this.artists = new ArtistManager(this);
        this.tracks = new TrackManager(this);
        this.episodes = new EpisodeManager(this);
        this.shows = new ShowManager(this);
        this.users = new UserManager(this);
        this.playlists = new PlaylistManager(this);
        this.categories = new CategoryManager(this);
        this.lastTokenUpdateAt = null;
    }
    get _api() {
        return this.rest.routeBuilder;
    }
    /**
     * Logs in the client and emits `ready` event on success
     * @param credentials The credentials that were used to log in the bot
     * @returns An `AccessTokenDetails` object
     */
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            this.credentials = credentials;
            const body = {
                grant_type: 'client_credentials',
            };
            const requestData = new RequestData({ body, useAccounts: true });
            const data = yield this._api.api.token.post(requestData);
            this.accessTokenDetails = new AccessTokenDetails(data);
            this.readyAt = this.lastTokenUpdateAt = new Date();
            this.emit(Events.READY);
            return this.accessTokenDetails;
        });
    }
    /**
     * Updates the access token by making a brand new `Client Credentials Flow` authorization request
     * and emits `accessTokenUpdate` event on success
     * @returns An `AccessTokenDetails` object
     */
    _updateAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                grant_type: 'client_credentials',
            };
            const requestData = new RequestData({ body, useAccounts: true });
            const data = yield this._api.api.token.post(requestData);
            this.accessTokenDetails = new AccessTokenDetails(data);
            this.lastTokenUpdateAt = new Date();
            this.emit(Events.ACCESS_TOKEN_UPDATE, this.accessTokenDetails);
            return this.accessTokenDetails;
        });
    }
    /**
     * Fetches a list of markets where Spotify is available
     * @returns An array of `ISO 3166-1 alpha-2` strings as a Promise
     */
    fetchAvailableMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._api.markets.get();
            return data.markets;
        });
    }
    /**
     * Fetches a list of available genres
     * @returns An array of genre strings as a Promise
     */
    fetchRecommendationGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._api.recommendations('available-genre-seeds').get();
            return data.genres;
        });
    }
}
