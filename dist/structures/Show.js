import SimplifiedShow from './SimplifiedShow.js';
import SimplifiedEpisode from './SimplifiedEpisode.js';
import { Page } from './Misc.js';
export default class Show extends SimplifiedShow {
    constructor(client, data) {
        super(client, data);
        this.episodes = new Page(this.client, data.episodes, SimplifiedEpisode);
    }
}
