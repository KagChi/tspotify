import PublicUser from './PublicUser.js';
import { ExplicitContentSettings } from './Misc.js';
export default class PrivateUser extends PublicUser {
    constructor(client, data) {
        var _a, _b;
        super(client, data);
        this.country = (_a = data === null || data === void 0 ? void 0 : data.country) !== null && _a !== void 0 ? _a : null;
        this.email = (_b = data === null || data === void 0 ? void 0 : data.email) !== null && _b !== void 0 ? _b : null;
        this.explicitContent = (data === null || data === void 0 ? void 0 : data.explicit_content) ? new ExplicitContentSettings(data === null || data === void 0 ? void 0 : data.explicit_content) : null;
        this.product = data.product;
    }
}
