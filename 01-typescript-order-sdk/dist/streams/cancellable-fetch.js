export class RequestTimeoutError extends Error {
    timeoutMS;
    constructor(timeoutMS, message = `Request timed out after ${timeoutMS}ms`) {
        super(message);
        this.timeoutMS = timeoutMS;
        this.name = "RequestTimeoutError";
    }
}
export class RequestCancelledError extends Error {
    constructor(message = "Request was cancelled") {
        super(message);
        this.name = "RequestCancelledError";
    }
}
export async function fetchWithTimeout(url, timeoutMS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMS);
    const startTime = performance.now();
    try {
        const response = await fetch(url, {
            signal: controller.signal,
        });
        if (!response.ok) {
            throw new Error(`HTTP request failed with status ${response.status}`);
        }
        const data = (await response.json());
        const durationMs = performance.now() - startTime;
        return { data, durationMs, status: response.status };
    }
    catch (error) {
        if (controller.signal.aborted) {
            throw new RequestTimeoutError(timeoutMS);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown fetch error");
    }
    finally {
        clearTimeout(timeoutId);
    }
}
//# sourceMappingURL=cancellable-fetch.js.map