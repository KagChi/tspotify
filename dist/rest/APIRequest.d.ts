import type Client from '../client/Client.js';
import type RESTManager from './RESTManager.js';
import type { Response } from 'undici';
import type { ExtendedRequestData } from '../typings/Types.js';
export default class APIRequest {
    rest: RESTManager;
    method: string;
    path: string;
    options: ExtendedRequestData<Record<string, string> | undefined, Record<string, string> | undefined>;
    route: string;
    client: Client;
    constructor(rest: RESTManager, method: string, path: string, options: ExtendedRequestData<Record<string, string> | undefined, Record<string, string> | undefined>);
    make(): Promise<Response>;
}
