import type { Response } from 'undici';
import type { ClientOptions } from '../typings/Interfaces.js';
export declare function mergeDefault(defaultObject: any, given: any): ClientOptions;
/**
 * Parses an API response and returns the body
 * @param res The response sent by the API
 * @returns The body of the response
 */
export declare function parseResponse(res: Response): Promise<unknown>;
