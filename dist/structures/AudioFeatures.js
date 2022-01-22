import BaseStructure from './BaseStructure.js';
export default class AudioFeatures extends BaseStructure {
    constructor(client, data) {
        super(client, data.id);
        this.acousticness = data.acousticness;
        this.analysisUrl = data.analysis_url;
        this.danceability = data.danceability;
        this.duration = data.duration_ms;
        this.energy = data.energy;
        this.instrumentalness = data.instrumentalness;
        this.key = data.key;
        this.liveness = data.liveness;
        this.loudness = data.loudness;
        this.mode = data.mode;
        this.rawObjectType = data.type;
        this.speechiness = data.speechiness;
        this.tempo = data.tempo;
        this.timeSignature = data.time_signature;
        this.trackHref = data.track_href;
        this.uri = data.uri;
        this.valence = data.valence;
    }
}
