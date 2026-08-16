import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { EventEmitter } from "node:events";
import { createHash } from "node:crypto";
const emitter = new EventEmitter();
function isProduct(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const product = value;
    return (typeof product.id === "number" &&
        typeof product.name === "string" &&
        typeof product.price === "number");
}
function validateProducts(value) {
    if (!Array.isArray(value)) {
        throw new Error("Expected an array");
    }
    if (!value.every(isProduct)) {
        throw new Error("Invalid product shape");
    }
    return value;
}
const onProgress = (message) => {
    console.log("Progress:", message);
};
emitter.on("progress", onProgress);
try {
    const inputPath = path.join(process.cwd(), "data", "input.json");
    const outputPath = path.join(process.cwd(), "data", "output.json");
    emitter.emit("progress", "Reading input");
    const content = await readFile(inputPath, "utf8");
    emitter.emit("progress", "Parsing JSON");
    const parsed = JSON.parse(content);
    const products = validateProducts(parsed);
    emitter.emit("progress", "Transforming data");
    const transformed = products.map((product) => ({
        ...product,
        displayName: `${product.name} - $${product.price}`,
    }));
    emitter.emit("progress", "Writing output");
    await writeFile(outputPath, JSON.stringify(transformed, null, 2), "utf8");
    const outputBuffer = await readFile(outputPath);
    const hash = createHash("sha256").update(outputBuffer).digest("hex");
    console.log("SHA-256:", hash);
    emitter.emit("complete", {
        outputPath,
        hash,
    });
}
finally {
    emitter.off("progress", onProgress);
}
//# sourceMappingURL=file-transform.js.map