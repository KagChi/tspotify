import Track from './Track.js';
import Episode from './Episode.js';
import PublicUser from './PublicUser.js';
import Collection from '../util/Collection.js';
import SimplifiedTrack from './SimplifiedTrack.js';
import type Client from '../client/Client.js';
import type { RequestDataOptions, StructureConstructable } from '../typings/Interfaces.js';
import type { CopyrightObject, ExternalIdObject, ExternalUrlObject, FollowersObject, ImageObject, ExplicitContentSettingsObject, BaseRestrictionObject, AlbumRestrictionObject, EpisodeRestrictionObject, TrackRestrictionObject, PlaylistTracksRefObject, PlaylistTrackObject, PagingObject, RecommendationSeedObject, RecommendationsObject, ClientCredentialsFlowAccessTokenObject } from 'spotify-api-types';
/**
 * The details about the access token returned by the API after logging in
 */
export declare class AccessTokenDetails {
    /**
     * The access token for the client
     */
    accessToken: string;
    /**
     * The type of the token
     */
    tokenType: string;
    /**
     * The time of expiry of the token in seconds
     */
    expiresIn: number;
    constructor(data: ClientCredentialsFlowAccessTokenObject);
}
export declare class BaseRestriction {
    /**
     * The reason for the restriction. Supported values:
     *
     * `market` - The content item is not available in the given market
     *
     * `product` - The content item is not available for the user’s subscription type
     *
     * `explicit` - The content item is explicit and the user’s account is set to not play explicit content
     *
     * **⚠️Note**: Additional reasons may be added in the future. If you use this field, make sure that your application safely handles unknown values
     */
    reason: string;
    constructor(data: BaseRestrictionObject);
}
export declare class AlbumRestriction extends BaseRestriction {
    constructor(data: AlbumRestrictionObject);
}
export declare class EpisodeRestriction extends BaseRestriction {
    constructor(data: EpisodeRestrictionObject);
}
export declare class TrackRestriction extends BaseRestriction {
    constructor(data: TrackRestrictionObject);
}
/**
 * Data used for generating an API request
 */
export declare class RequestData<Q = undefined, B = undefined> {
    /**
     * The subdomain of the endpoint being requested
     */
    useAccounts?: boolean;
    /**
     * The query object for the request
     */
    query?: Q;
    /**
     * The body of the request
     */
    body?: B;
    constructor(data: RequestDataOptions<Q, B>);
}
/**
 * Holds copyright details for a content on Spotify
 */
export declare class Copyright {
    /**
     * The copyright text for this content
     */
    text: string;
    /**
     * The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright
     */
    type: string;
    constructor(data: CopyrightObject);
}
/**
 * Holds details about external IDs of a content
 */
export declare class ExternalId {
    /**
     * International Article Number
     */
    ean: string;
    /**
     * International Standard Recording Code
     */
    isrc: string;
    /**
     * Universal Product Code
     */
    upc: string;
    constructor(data: ExternalIdObject);
}
/**
 * Holds the Spotify URL for the content
 */
export declare class ExternalUrl {
    /**
     * The Spotify URL for the object
     */
    spotify: string;
    constructor(data: ExternalUrlObject);
}
export declare class ExplicitContentSettings {
    /**
     * When `true`, indicates that explicit content should not be played
     */
    filterEnabled: boolean;
    /**
     * When `true`, indicates that the explicit content setting is locked and can’t be changed by the user
     */
    filterLocked: boolean;
    constructor(data: ExplicitContentSettingsObject);
}
export declare class Followers {
    /**
     * A link to the Web API endpoint providing full details of the followers, `null` if not available.
     *
     * **⚠️Note**: Please note that this will always be set to null, as the Web API does not support it at the moment
     */
    href: string | null;
    /**
     * The total number of followers
     */
    total: number;
    constructor(data: FollowersObject);
}
export declare class Image {
    /**
     * The image height in pixels
     */
    height: number | null;
    /**
     * The source URL of the image
     */
    url: string;
    /**
     * The image width in pixels
     */
    width: number | null;
    constructor(data: ImageObject);
}
export declare class Page<R, T> {
    private _holds;
    client: Client;
    href: string;
    items: Collection<string, T>;
    limit: number;
    next: string | null;
    offset: number;
    previous: string;
    total: number;
    constructor(client: Client, data: PagingObject<R>, structureType: StructureConstructable<T>);
    private _patchItems;
}
export declare class PlaylistTrack {
    /**
     * The date and time the track or episode was added
     *
     * **⚠️Note**: Some very old playlists may return `null` in this field
     */
    addedAt: Date | null;
    /**
     * The Spotify user who added the track or episode
     *
     * **⚠️Note**: Some very old playlists may return `null` in this field
     */
    addedBy: PublicUser | null;
    /**
     * Whether this track or episode is a local file or not
     */
    isLocal: boolean;
    /**
     * Information about the track or episode
     */
    track: Track | Episode;
    constructor(client: Client, data: PlaylistTrackObject);
}
export declare class PlaylistTracksRef {
    /**
     * A link to the Web API endpoint where full details of the playlist’s tracks can be retrieved
     */
    href: string;
    /**
     * Number of tracks in the playlist
     */
    total: number;
    constructor(data: PlaylistTracksRefObject);
}
export declare class RecommendationSeed {
    /**
     * The number of tracks available after `min_*` and `max_*` filters have been applied
     */
    afterFilteringSize: number;
    /**
     * The number of tracks available after relinking for regional availability
     */
    afterRelinkingSize: number;
    /**
     * A link to the full track or artist data for this seed. For tracks this will be a link to a `Track`. For artists a link to an `Artist`. For genre seeds, this value will be `null`
     */
    href: string | null;
    /**
     * The id used to select this seed. This will be same as the string used in `seed` parameter of `SeedData`
     */
    id: string;
    /**
     * The number of recommended tracks available for this seed
     */
    initialPoolSize: number;
    /**
     * The entity type of this seed
     *
     * One of `ARTIST`, `TRACK` or `GENRE`
     */
    type: string;
    constructor(data: RecommendationSeedObject);
}
export declare class Recommendation {
    /**
     * The client that instantiated this
     */
    client: Client;
    /**
     * An array of recommendation seed objects
     */
    seeds: Array<RecommendationSeed>;
    /**
     * A collection of simplified track objects, ordered according to the parameters supplied
     */
    tracks: Collection<string, SimplifiedTrack>;
    constructor(client: Client, data: RecommendationsObject);
    private _patchSeeds;
    private _patchTracks;
}
