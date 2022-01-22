import BaseManager from './BaseManager.js';
import Episode from '../structures/Episode.js';
import { Page } from '../structures/Misc.js';
import SimplifiedEpisode from '../structures/SimplifiedEpisode.js';
import type Client from '../client/Client.js';
import type { FetchEpisodeOptions, FetchEpisodesOptions, SearchEpisodesOptions } from '../typings/Interfaces.js';
import type { SimplifiedEpisodeObject } from 'spotify-api-types';
import type { EpisodeResolvable, FetchedEpisode } from '../typings/Types.js';
export default class EpisodeManager extends BaseManager<EpisodeResolvable, Episode> {
    constructor(client: Client);
    /**
     * Resolves an EpisodeResolvable to an Episode object
     */
    resolve(episodeResolvable: EpisodeResolvable): Episode | null;
    /**
     * Resolves an EpisodeResolvable to an Episode ID
     */
    resolveId(episodeResolvable: EpisodeResolvable): string | null;
    /**
     * Fetches episode(s) from Spotify
     */
    fetch<T extends FetchEpisodeOptions | FetchEpisodesOptions>(options: T): Promise<FetchedEpisode<T> | null>;
    private _fetchSingle;
    private _fetchMany;
    /**
     * Fetches episodes from Spotify by searching
     * @param options The options provided for searching episodes
     * @returns A `Page` of `SimplifiedEpisode` objects as a Promise
     */
    search(options: SearchEpisodesOptions): Promise<Page<SimplifiedEpisodeObject, SimplifiedEpisode>>;
}
