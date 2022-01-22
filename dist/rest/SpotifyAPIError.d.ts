import type { AuthenticationErrorObject, RegularErrorObject } from 'spotify-api-types';
/**
 * Represents a Spotify API error
 */
export default class SpotifyAPIError extends Error {
    /**
     * The HTTP method used for the request
     */
    method: string;
    /**
     * The path of the request relative to base API endpoint
     */
    path: string;
    /**
     * The HTTP status code of the response
     */
    httpStatusCode: number;
    constructor(method: string, path: string, httpStatusCode: number, errorObject: AuthenticationErrorObject | RegularErrorObject);
    private _patchErrorMessage;
}
