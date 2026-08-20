export interface CopyResult {
    bytesProcessed: number;
    durationMs: number;
}
export declare function copyLargeFile(sourcePath: string, destinationPath: string): Promise<CopyResult>;
export declare function verifyCopiedFile(sourcePath: string, destinationPath: string): Promise<boolean>;
//# sourceMappingURL=stream-copy.d.ts.map