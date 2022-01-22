import BaseManager from './BaseManager.js';
import Category from '../structures/Category.js';
import { Page } from '../structures/Misc.js';
import SimplifiedPlaylist from '../structures/SimplifiedPlaylist.js';
import type Client from '../client/Client.js';
import type { FetchCategoriesOptions, FetchCategoryOptions, FetchCategoryPlaylistsOptions } from '../typings/Interfaces.js';
import type { SimplifiedPlaylistObject } from 'spotify-api-types';
import type { CategoryResolvable, FetchedCategory } from '../typings/Types.js';
export default class CategoryManager extends BaseManager<CategoryResolvable, Category> {
    constructor(client: Client);
    /**
     * Fetches one or more categories from Spotify
     * @param options Options for fetching categories
     * @returns A `Category` or a Page of `Category` objects as a Promise
     */
    fetch<T extends CategoryResolvable | FetchCategoryOptions | FetchCategoriesOptions>(options: T): Promise<FetchedCategory<T>>;
    private _fetchSingle;
    private _fetchMultiple;
    /**
     * Fetches playlists listed under a specific category
     * @param categoryResolvable The category from which playlists are to be fetched
     * @param options Options for fetching the playlists
     * @returns A Page of `SimplifiedPlaylist` objects as a Promise
     */
    fetchPlaylists(categoryResolvable: CategoryResolvable, options?: FetchCategoryPlaylistsOptions): Promise<Page<SimplifiedPlaylistObject, SimplifiedPlaylist>>;
}
