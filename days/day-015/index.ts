import { copyLargeFile, verifyCopiedFile } from "./stream-copy.js";
import { fetchWithTimeout, RequestTimeoutError } from "./cancellable-fetch.js";

async function runStreamExample(): Promise<void> {
  console.log("\n--- STREAM COPY ---");

  try {
    const result = await copyLargeFile(
      "./sample/large-file.txt",
      "./output/copied-file.txt",
    );

    console.log(`Bytes processed: ${result.bytesProcessed}`);

    console.log(`Duration: ${result.durationMs.toFixed(2)}ms`);

    const isValid = await verifyCopiedFile(
      "./sample/large-file.txt",
      "./output/copied-file.txt",
    );

    console.log(`Copy verification: ${isValid ? "SUCCESS" : "FAILED"}`);
  } catch (error) {
    console.error("Stream copy failed:", error);
  }
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function runFetchExample(): Promise<void> {
  console.log("\n--- CANCELLABLE FETCH ---");

  try {
    const result = await fetchWithTimeout<Todo>(
      "https://httpbin.org/delay/5",
      1000,
    );

    console.log("HTTP status:", result.status);

    console.log(`Request duration: ${result.durationMs.toFixed(2)}ms`);

    console.log("Response data:");

    console.log(result.data);
  } catch (error: unknown) {
    if (error instanceof RequestTimeoutError) {
      console.error(`Request timed out after ${error.timeoutMS}ms`);

      return;
    }

    if (error instanceof Error) {
      console.error("Request failed:", error.message);

      return;
    }

    console.error("Unknown error occurred");
  }
}

async function main(): Promise<void> {
  await runStreamExample();

  await runFetchExample();
}

main().catch((error: unknown) => {
  console.error("Application failed:", error);

  process.exitCode = 1;
});
