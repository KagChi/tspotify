import { Image } from './Misc.js';
import BaseStructure from './BaseStructure.js';
export default class Category extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.href = data.href;
        this.icons = this._patchImages(data.icons);
        this.name = data.name;
    }
    _patchImages(data) {
        const imagesArray = [];
        data.forEach(imageObject => {
            imagesArray.push(new Image(imageObject));
        });
        return imagesArray;
    }
}
