import { Worker } from "node:worker_threads";
console.time("worker-work");
const worker = new Worker(new URL("./worker.js", import.meta.url));
worker.on("message", () => {
    console.timeEnd("worker-work");
});
setInterval(() => {
    console.log("tick");
}, 1000);
//# sourceMappingURL=main-worker.js.map