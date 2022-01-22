import { AsyncQueue } from '@sapphire/async-queue';
import type APIRequest from './APIRequest.js';
import type RESTManager from './RESTManager.js';
export default class RequestHandler {
    /**
     * The manager of that initiated this class
     */
    manager: RESTManager;
    /**
     * The queue for the requests
     */
    queue: AsyncQueue;
    constructor(manager: RESTManager);
    push(request: APIRequest): Promise<unknown>;
    execute(request: APIRequest): Promise<unknown>;
}
