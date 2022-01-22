var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseResponse } from '../util/Util.js';
import { AsyncQueue } from '@sapphire/async-queue';
import SpotifyAPIError from './SpotifyAPIError.js';
export default class RequestHandler {
    constructor(manager) {
        this.manager = manager;
        this.queue = new AsyncQueue();
    }
    push(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.wait();
            try {
                return yield this.execute(request);
            }
            finally {
                this.queue.shift();
            }
        });
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.make();
            if (res.ok) {
                return parseResponse(res);
            }
            const errorObject = (yield parseResponse(res));
            throw new SpotifyAPIError(request.method, request.path, res.status, errorObject);
        });
    }
}
