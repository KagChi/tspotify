import SimplifiedEpisode from './SimplifiedEpisode.js';
import SimplifiedShow from './SimplifiedShow.js';
export default class Episode extends SimplifiedEpisode {
    constructor(client, data) {
        super(client, data);
        this.show = new SimplifiedShow(client, data.show);
    }
}
