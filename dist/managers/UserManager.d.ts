import BaseManager from './BaseManager.js';
import PublicUser from '../structures/PublicUser.js';
import type Client from '../client/Client.js';
import type { UserResolvable } from '../typings/Types.js';
import type { FetchUserOptions } from '../typings/Interfaces.js';
export default class UserManager extends BaseManager<UserResolvable, PublicUser> {
    constructor(client: Client);
    /**
     * Fetches a user from Spotify
     * @param options The options for fetching a user
     * @returns A `PublicUser` object as a Promise
     */
    fetch<T extends UserResolvable | FetchUserOptions>(options: T): Promise<PublicUser | null>;
    private _fetchSingle;
}
