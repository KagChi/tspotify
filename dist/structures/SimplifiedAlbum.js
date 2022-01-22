import BaseAlbum from './BaseAlbum.js';
export default class SimplifiedAlbum extends BaseAlbum {
    constructor(client, data) {
        var _a;
        super(client, data);
        this.albumGroup = (_a = data === null || data === void 0 ? void 0 : data.album_group) !== null && _a !== void 0 ? _a : null;
    }
}
