/**
 * Represents a Spotify API error
 */
export default class SpotifyAPIError extends Error {
    constructor(method, path, httpStatusCode, errorObject) {
        super();
        this.message = this._patchErrorMessage(errorObject);
        this.method = method;
        this.path = path;
        this.httpStatusCode = httpStatusCode;
    }
    _patchErrorMessage(errorObject) {
        if (typeof errorObject.error === 'string') {
            const authError = errorObject;
            this.name = `SpotifyAPIError [${authError.error}]`;
            return authError.error_description;
        }
        const regularError = errorObject.error;
        this.name = `SpotifyAPIError [${regularError.status}]`;
        return regularError.message;
    }
}
