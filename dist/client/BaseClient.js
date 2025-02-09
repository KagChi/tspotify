import { EventEmitter } from 'events';
import { mergeDefault } from '../util/Util.js';
import { DefaultClientOptions } from '../util/Constants.js';
/**
 * Base class for client
 */
export default class BaseClient extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = mergeDefault(DefaultClientOptions, options);
    }
}
