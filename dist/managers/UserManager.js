var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseManager from './BaseManager.js';
import PublicUser from '../structures/PublicUser.js';
export default class UserManager extends BaseManager {
    constructor(client) {
        super(client, PublicUser);
    }
    /**
     * Fetches a user from Spotify
     * @param options The options for fetching a user
     * @returns A `PublicUser` object as a Promise
     */
    fetch(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!options)
                throw new Error('Invalid argument');
            const userId = this.resolveId(options);
            if (userId)
                return this._fetchSingle(userId);
            const user = (_a = options) === null || _a === void 0 ? void 0 : _a.user;
            if (user) {
                const userId = this.resolveId(user);
                if (userId)
                    return this._fetchSingle(userId, options);
            }
            return null;
        });
    }
    _fetchSingle(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(options === null || options === void 0 ? void 0 : options.skipCacheCheck)) {
                const cachedUser = this.cache.get(id);
                if (cachedUser)
                    return cachedUser;
            }
            const data = yield this.client._api.users(id).get();
            return this.add(data.id, options === null || options === void 0 ? void 0 : options.cacheAfterFetching, data);
        });
    }
}
