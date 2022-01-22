import Show from '../structures/Show.js';
import BaseManager from './BaseManager.js';
import SimplifiedShow from '../structures/SimplifiedShow.js';
import SimplifiedEpisode from '../structures/SimplifiedEpisode.js';
import { Page } from '../structures/Misc.js';
import type Client from '../client/Client.js';
import type { FetchShowOptions, FetchShowsOptions, FetchShowEpisodesOptions, SearchShowsOptions } from '../typings/Interfaces.js';
import type { SimplifiedShowObject, SimplifiedEpisodeObject } from 'spotify-api-types';
import type { ShowResolvable, FetchedShow } from '../typings/Types.js';
export default class ShowManager extends BaseManager<ShowResolvable, Show> {
    constructor(client: Client);
    /**
     * Resolves a ShowResolvable to a Show object
     */
    resolve(showResolvable: ShowResolvable): Show | null;
    /**
     * Resolves a ShowResolvable to a Show ID
     */
    resolveId(showResolvable: ShowResolvable): string | null;
    fetch<T extends FetchShowOptions | FetchShowsOptions>(options: T): Promise<FetchedShow<T> | null>;
    private _fetchSingle;
    /**
     * **⚠️Note**: Unlike other bulk endpoints, this one doesn't return a complete object. Since, the object(s) fetched
     * by this method are `SimplifiedShow`, they aren't cached
     */
    private _fetchMany;
    /**
     * Fetches episodes of a show
     * @param show The show whose episodes are to be fetched
     * @param options The options for fetching episodes of a show
     * @returns A Page of `SimplifiedEpisode` objects as a Promise
     */
    fetchEpisodes(show: ShowResolvable, options: FetchShowEpisodesOptions): Promise<Page<SimplifiedEpisodeObject, SimplifiedEpisode>>;
    /**
     * Fetches shows from Spotify by searching
     * @param options The options provided for searching shows
     * @returns A `Page` of `SimplifiedShow` objects as a Promise
     */
    search(options: SearchShowsOptions): Promise<Page<SimplifiedShowObject, SimplifiedShow>>;
}
