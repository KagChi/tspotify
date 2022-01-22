/**
 * Base class for all structures
 */
export default class BaseStructure {
    /**
     * @param client The client that instantiated this class
     * @param id The Spotify ID of the structure
     */
    constructor(client, id) {
        Object.defineProperty(this, 'client', { writable: true });
        this.client = client;
        this.id = id;
    }
}
