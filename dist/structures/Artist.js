import SimplifiedArtist from './SimplifiedArtist.js';
import { Followers, Image } from './Misc.js';
/**
 * Represents an artist on Spotify
 */
export default class Artist extends SimplifiedArtist {
    constructor(client, data) {
        super(client, data);
        this.followers = new Followers(data.followers);
        this.genres = data.genres;
        this.images = this._patchImages(data.images);
        this.popularity = data.popularity;
    }
    _patchImages(data) {
        const imagesArray = [];
        data.forEach(imageObject => {
            imagesArray.push(new Image(imageObject));
        });
        return imagesArray;
    }
}
