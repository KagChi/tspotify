import Collection from '../util/Collection.js';
import RequestHandler from './RequestHandler.js';
import type Client from '../client/Client.js';
import type { ExtendedRequestData } from '../typings/Types.js';
export default class RESTManager {
    #private;
    /**
     * The client that initiated this class
     */
    client: Client;
    /**
     * The collection of request handlers
     */
    requestHandlers: Collection<string, RequestHandler>;
    constructor(client: Client);
    get routeBuilder(): any;
    get baseURL(): string;
    get baseAccountServiceURL(): string;
    getBasicAuth(): string;
    getBearerToken(): string;
    request(method: string, path: string, options: ExtendedRequestData<Record<string, string> | undefined, Record<string, string> | undefined>): Promise<unknown>;
}
