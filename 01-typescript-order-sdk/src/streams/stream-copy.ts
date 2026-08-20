import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { pipeline } from "node:stream/promises";

export interface CopyResult {
  bytesProcessed: number;
  durationMs: number;
}

export async function copyLargeFile(
  sourcePath: string,
  destinationPath: string,
): Promise<CopyResult> {
  await mkdir(dirname(destinationPath), {
    recursive: true,
  });

  let bytesProcessed = 0;

  const startTime = performance.now();

  const readableStream = createReadStream(sourcePath);

  const writableStream = createWriteStream(destinationPath);

  readableStream.on("data", (chunk: Buffer) => {
    bytesProcessed += chunk.length;
  });

  await pipeline(readableStream, writableStream);

  const durationMs = performance.now() - startTime;

  return {
    bytesProcessed,
    durationMs,
  };
}

export async function verifyCopiedFile(
  sourcePath: string,
  destinationPath: string,
): Promise<boolean> {
  const sourceStats = await stat(sourcePath);
  const destinationStats = await stat(destinationPath);

  return sourceStats.size === destinationStats.size;
}
