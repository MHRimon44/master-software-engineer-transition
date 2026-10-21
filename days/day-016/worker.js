import { parentPort } from "node:worker_threads";

let total = 0;

for (let i = 0; i < 20_000_000_000; i++) {
  total += i;
}

parentPort?.postMessage(total);
