import Collection from '../util/Collection.js';
import { GetSearchResponse } from 'spotify-api-types';
import type Client from '../client/Client.js';
import type BaseStructure from '../structures/BaseStructure.js';
import type { SearchOptions, StructureConstructable } from '../typings/Interfaces.js';
import type { SearchItemType } from '../typings/Types.js';
/**
 * Base class for all managers
 */
export default class BaseManager<R, T extends BaseStructure> {
    /**
     * Client that instantiated this class
     */
    client: Client;
    /**
     * The cache of the structures held by this manager
     */
    cache: Collection<string, T>;
    /**
     * The type of structure held by this manager
     */
    protected _holds: StructureConstructable<T>;
    /**
     * @param client The client that instantiated this manager
     * @param structureType The type of structure held by this manager
     */
    constructor(client: Client, structureType: StructureConstructable<T>);
    /**
     * Resolves a structure resolvable to its respective structure
     * @param idOrInstance The ID or instance of the structure held by this manager
     */
    resolve(idOrInstance: string | R): T | null;
    /**
     * Resolves a structure resolvable to its id
     * @param idOrInstance The ID or instance of the strucutre held by this manager
     */
    resolveId(idOrInstance: string | R): string | null;
    /**
     * Converts raw data sent by the API to a structure and adds it to the cache
     * @param id The ID of the structure
     * @param cacheAfterFetching Whether to cache the structure or not
     * @param data The raw data returned by the API for this structure
     */
    add(id: string, cacheAfterFetching: boolean | undefined, data: unknown): T;
    /**
     * Searches Spotify
     * @param options The options for searching
     * @param type The type of items to search
     */
    protected _search(options: SearchOptions, type: SearchItemType, market?: string): Promise<GetSearchResponse>;
}
