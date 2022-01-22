import BaseStructure from './BaseStructure.js';
import type Client from '../client/Client.js';
import type { AudioFeaturesObject } from 'spotify-api-types';
export default class AudioFeatures extends BaseStructure {
    acousticness: number;
    analysisUrl: string;
    danceability: number;
    duration: number;
    energy: number;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    timeSignature: number;
    trackHref: string;
    rawObjectType: string;
    uri: string;
    valence: number;
    constructor(client: Client, data: AudioFeaturesObject);
}
