export class RequestTimeoutError extends Error {
  constructor(
    public readonly timeoutMS: number,
    message = `Request timed out after ${timeoutMS}ms`,
  ) {
    super(message);
    this.name = "RequestTimeoutError";
  }
}

export class RequestCancelledError extends Error {
  constructor(message = "Request was cancelled") {
    super(message);
    this.name = "RequestCancelledError";
  }
}
export interface FetchResult<T> {
  data: T;
  durationMs: number;
  status: number;
}

export async function fetchWithTimeout<T>(
  url: string,
  timeoutMS: number,
): Promise<FetchResult<T>> {
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
    const data = (await response.json()) as T;
    const durationMs = performance.now() - startTime;
    return { data, durationMs, status: response.status };
  } catch (error: unknown) {
    if (controller.signal.aborted) {
      throw new RequestTimeoutError(timeoutMS);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown fetch error");
  } finally {
    clearTimeout(timeoutId);
  }
}
