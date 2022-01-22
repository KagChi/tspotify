import BaseStructure from './BaseStructure.js';
import { ExternalUrl, Image, EpisodeRestriction } from './Misc.js';
import type Client from '../client/Client.js';
import type { SimplifiedEpisodeObject } from 'spotify-api-types';
export default class SimplifiedEpisode extends BaseStructure {
    /**
     * A URL to a 30 second preview (MP3 format) of the episode. `null` if not available
     */
    audioPreviewUrl: string | null;
    /**
     * A description of the episode
     */
    description: string;
    /**
     * The episode length in milliseconds
     */
    duration: number;
    /**
     * Whether or not the episode has explicit content (`true` = yes it does; `false` = no it does not OR unknown)
     */
    explicit: boolean;
    /**
     * External URLs for this episode
     */
    externalUrls: ExternalUrl;
    /**
     * A link to the Web API endpoint providing full details of the episode
     */
    href: string;
    /**
     * A description of the episode. This field may contain HTML tags
     */
    htmlDescription: string;
    /**
     * The cover art for the episode in various sizes, widest first
     */
    images: Array<Image>;
    /**
     * True if the episode is hosted outside of Spotify’s CDN
     */
    isExternallyHosted: boolean;
    /**
     * True if the episode is playable in the given market. Otherwise false
     */
    isPlayable: boolean;
    /**
     * The language used in the episode, identified by a `ISO 639` code
     *
     * **⚠️Note**: This field is deprecated and might be removed in the future. Please use the languages field instead
     */
    language: string;
    /**
     * A list of the languages used in the episode, identified by their `ISO 639` code
     */
    languages: Array<string>;
    /**
     * The name of the episode
     */
    name: string;
    /**
     * The date the episode was first released, for example `1981-12-15`. Depending on the precision, it might be shown as `1981` or `1981-12`
     */
    releaseDate: string;
    /**
     * The precision with which `releaseDate` value is known: `year`, `month`, or `day`
     */
    releaseDatePrecision: string;
    /**
     * Included in the response when a content restriction is applied
     */
    restrictions: EpisodeRestriction | null;
    /**
     * The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope `user-read-playback-position`
     */
    resumePoint: any;
    /**
     * The object type: `episode`
     */
    rawObjectType: string;
    /**
     * The Spotify URI for the episode
     */
    uri: string;
    constructor(client: Client, data: SimplifiedEpisodeObject);
    private _patchImages;
}
