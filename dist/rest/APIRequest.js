var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetch } from 'undici';
export default class APIRequest {
    constructor(rest, method, path, options) {
        this.rest = rest;
        this.method = method;
        this.path = path;
        this.options = options;
        this.route = options.route;
        this.client = rest.client;
        if (options.query) {
            const querystring = Object.entries(options.query)
                .filter(([, value]) => value !== null && typeof value !== 'undefined')
                .map(([key, value]) => (Array.isArray(value) ? `${key}=${value.join(',')}` : `${key}=${value}`))
                .join('&');
            this.path = `${path}?${querystring}`;
        }
    }
    make() {
        return __awaiter(this, void 0, void 0, function* () {
            const baseURL = this.options.useAccounts
                ? `${this.client.options.api.baseAccountServiceURL}`
                : `${this.client.options.api.baseURL}/v${this.client.options.api.version}`;
            const url = baseURL + this.path;
            const headers = {};
            headers.Authorization = this.options.useAccounts ? this.rest.getBasicAuth() : this.rest.getBearerToken();
            let body;
            if (this.method !== 'get' && this.options.body) {
                if (this.options.useAccounts) {
                    body = new URLSearchParams(this.options.body).toString();
                    headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
                else {
                    body = JSON.stringify(this.options.body);
                    headers['Content-Type'] = 'application/json';
                }
            }
            return fetch(url, {
                method: this.method,
                keepalive: true,
                headers,
                body,
            });
        });
    }
}
