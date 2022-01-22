var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RESTManager_instances, _RESTManager_checkAccessTokenStatus;
import APIRequest from './APIRequest.js';
import { buildRoute } from './APIRouter.js';
import Collection from '../util/Collection.js';
import RequestHandler from './RequestHandler.js';
export default class RESTManager {
    constructor(client) {
        _RESTManager_instances.add(this);
        this.client = client;
        this.requestHandlers = new Collection();
    }
    get routeBuilder() {
        return buildRoute(this);
    }
    get baseURL() {
        return this.client.options.api.baseURL;
    }
    get baseAccountServiceURL() {
        return this.client.options.api.baseAccountServiceURL;
    }
    getBasicAuth() {
        const { clientId, clientSecret } = this.client.credentials;
        const authHeaderString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        return `Basic ${authHeaderString}`;
    }
    getBearerToken() {
        var _a;
        return `Bearer ${(_a = this.client.accessTokenDetails) === null || _a === void 0 ? void 0 : _a.accessToken}`;
    }
    request(method, path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // for every non-authorization endpoint request, check whether access token has expired or not. If yes, then re-authorize the client
            if (!options.useAccounts)
                yield __classPrivateFieldGet(this, _RESTManager_instances, "m", _RESTManager_checkAccessTokenStatus).call(this);
            const apiRequest = new APIRequest(this, method, path, options);
            let handler = this.requestHandlers.get(apiRequest.route);
            if (!handler) {
                handler = new RequestHandler(this);
                this.requestHandlers.set(apiRequest.route, handler);
            }
            return handler.push(apiRequest);
        });
    }
}
_RESTManager_instances = new WeakSet(), _RESTManager_checkAccessTokenStatus = function _RESTManager_checkAccessTokenStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessTokenDetails, lastTokenUpdateAt } = this.client;
        if (!lastTokenUpdateAt || !accessTokenDetails)
            throw new Error('Client was not ready.');
        const expiresInMs = accessTokenDetails.expiresIn * 1000;
        const timeLeft = new Date().getTime() - lastTokenUpdateAt.getTime();
        // add a margin of 10 seconds for being on the safe side that the token will not expire just after this check
        const margin = 10000;
        if (timeLeft + margin < expiresInMs)
            return;
        yield this.client._updateAccessToken();
    });
};
