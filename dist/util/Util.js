var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
/* eslint-disable */
export function mergeDefault(defaultObject, given) {
    if (!given)
        return defaultObject;
    let key;
    for (key in defaultObject) {
        if (!has(given, key) || given[key] === undefined) {
            given[key] = defaultObject[key];
        }
        else if (given[key] === Object(given[key])) {
            given[key] = mergeDefault(defaultObject[key], given[key]);
        }
    }
    return given;
}
/**
 * Parses an API response and returns the body
 * @param res The response sent by the API
 * @returns The body of the response
 */
export function parseResponse(res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = res.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) {
            return res.json();
        }
        return res.arrayBuffer();
    });
}
