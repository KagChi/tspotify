import type { ErrorMessageBuilder } from '../typings/Interfaces.js';
export declare function makeTspotifyError(Base: ErrorConstructor): any;
export declare function formatErrorMessage(key: string, args: Array<string>): string;
export declare function regsiterErrorMessage(key: string, message: string | ErrorMessageBuilder): Map<string, string | ErrorMessageBuilder>;
export declare const CustomErrors: {
    CustomError: any;
    CustomTypeError: any;
    CustomRangeError: any;
};
