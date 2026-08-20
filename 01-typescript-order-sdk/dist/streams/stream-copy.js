import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { pipeline } from "node:stream/promises";
export async function copyLargeFile(sourcePath, destinationPath) {
    await mkdir(dirname(destinationPath), {
        recursive: true,
    });
    let bytesProcessed = 0;
    const startTime = performance.now();
    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destinationPath);
    readableStream.on("data", (chunk) => {
        bytesProcessed += chunk.length;
    });
    await pipeline(readableStream, writableStream);
    const durationMs = performance.now() - startTime;
    return {
        bytesProcessed,
        durationMs,
    };
}
export async function verifyCopiedFile(sourcePath, destinationPath) {
    const sourceStats = await stat(sourcePath);
    const destinationStats = await stat(destinationPath);
    return sourceStats.size === destinationStats.size;
}
//# sourceMappingURL=stream-copy.js.map