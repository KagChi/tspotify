import BaseManager from './BaseManager.js';
import Track from '../structures/Track.js';
import { Page, Recommendation } from '../structures/Misc.js';
import type Client from '../client/Client.js';
import type { FetchTrackOptions, FetchTracksOptions, FetchSingleAudioFeaturesOptions, FetchMultipleAudioFeaturesOptions, FetchRecommendationsOptions, SearchTracksOptions } from '../typings/Interfaces.js';
import type { TrackObject } from 'spotify-api-types';
import type { TrackResolvable, FetchedTrack, FetchedAudioFeatures } from '../typings/Types.js';
export default class TrackManager extends BaseManager<TrackResolvable, Track> {
    constructor(client: Client);
    /**
     * Resolves a TrackResolvable to a Track object
     */
    resolve(trackResolvable: TrackResolvable): Track | null;
    /**
     * Resolves a TrackResolvable to a Track ID
     */
    resolveId(trackResolvable: TrackResolvable): string | null;
    /**
     * Fetches track(s) from Spotify
     */
    fetch<T extends TrackResolvable | FetchTrackOptions | FetchTracksOptions>(options: T): Promise<FetchedTrack<T> | null>;
    private _fetchSingle;
    private _fetchMany;
    /**
     * Fetches audio features of a track
     * @param options Options for fetching audio features of a track
     * @returns An `AudioFeatures` object or an array of `AudioFeatures` as a Promise
     */
    fetchAudioFeatures<T extends TrackResolvable | FetchSingleAudioFeaturesOptions | FetchMultipleAudioFeaturesOptions>(options: T): Promise<FetchedAudioFeatures<T> | null>;
    private _fetchSingleAudioFeatures;
    private _fetchManyAudioFeatures;
    /**
     * Fetches recommended tracks on the basis of options provided
     * @param options The options for fetching recommendations
     * @returns A `Recommendation` object as a Promise
     */
    fetchRecommendations(options: FetchRecommendationsOptions): Promise<Recommendation>;
    /**
     * Fetches tracks from Spotify by searching
     * @param options The options provided for searching tracks
     * @returns A `Page` of `Track` objects as a Promise
     */
    search(options: SearchTracksOptions): Promise<Page<TrackObject, Track>>;
}
