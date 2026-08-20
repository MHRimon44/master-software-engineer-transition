export declare class RequestTimeoutError extends Error {
    readonly timeoutMS: number;
    constructor(timeoutMS: number, message?: string);
}
export declare class RequestCancelledError extends Error {
    constructor(message?: string);
}
export interface FetchResult<T> {
    data: T;
    durationMs: number;
    status: number;
}
export declare function fetchWithTimeout<T>(url: string, timeoutMS: number): Promise<FetchResult<T>>;
//# sourceMappingURL=cancellable-fetch.d.ts.map