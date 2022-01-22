import { Image } from './Misc.js';
import BaseStructure from './BaseStructure.js';
import type Client from '../client/Client.js';
import type { CategoryObject } from 'spotify-api-types';
export default class Category extends BaseStructure {
    /**
     * A link to the Web API endpoint returning full details of the category
     */
    href: string;
    /**
     * The category icons, in various sizes
     */
    icons: Array<Image>;
    /**
     * The name of the category
     */
    name: string;
    constructor(client: Client, data: CategoryObject);
    private _patchImages;
}
