import BaseStructure from './BaseStructure.js';
import { ExternalUrl } from './Misc.js';
import type Client from '../client/Client.js';
import type { LinkedTrackObject } from 'spotify-api-types';
import type AudioFeatures from './AudioFeatures.js';
export default class LinkedTrack extends BaseStructure {
    /**
     * Known external URLs for this track
     */
    externalUrls: ExternalUrl;
    /**
     * A link to the Web API endpoint providing full details of the track
     */
    href: string;
    /**
     * The raw object type returned by the api: `album`
     */
    rawObjectType: string;
    /**
     * The Spotify URI for the track
     */
    uri: string;
    constructor(client: Client, data: LinkedTrackObject);
    /**
     * Fetches audio features for this track
     * @returns An `AudioFeatures` object
     */
    fetchAudioFeatures(): Promise<AudioFeatures | null>;
}
