/// <reference types="node" />
import { EventEmitter } from 'events';
import type { ClientOptions } from '../typings/Interfaces.js';
/**
 * Base class for client
 */
export default class BaseClient extends EventEmitter {
    /**
     * Options to pass when initiating the client
     */
    options: ClientOptions;
    constructor(options?: {});
}
