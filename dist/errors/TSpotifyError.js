const errorMessagesMap = new Map();
export function makeTspotifyError(Base) {
    return class TspotifyError extends Base {
        constructor(key, ...args) {
            super(formatErrorMessage(key, args));
            this.code = key;
            if (Error.captureStackTrace)
                Error.captureStackTrace(this, TspotifyError);
        }
        get name() {
            return `${super.name} [${this.code}]`;
        }
    };
}
export function formatErrorMessage(key, args) {
    if (typeof key !== 'string')
        throw new Error('Error message key must be a string');
    const errorMessage = errorMessagesMap.get(key);
    if (!errorMessage)
        throw new Error(`An invalid error message key was used: ${key}.`);
    if (typeof errorMessage === 'function')
        return errorMessage(...args);
    if (typeof args === 'undefined' || args.length === 0)
        return errorMessage;
    args.unshift(errorMessage);
    return args.toString();
}
export function regsiterErrorMessage(key, message) {
    return errorMessagesMap.set(key, typeof message === 'function' ? message : String(message));
}
export const CustomErrors = {
    CustomError: makeTspotifyError(Error),
    CustomTypeError: makeTspotifyError(TypeError),
    CustomRangeError: makeTspotifyError(RangeError),
};
