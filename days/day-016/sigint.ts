console.log("Application started");

const interval = setInterval(() => {
  console.log("working");
}, 1000);

process.on("SIGINT", () => {
  console.log("Received SIGINT");

  clearInterval(interval);
  console.log("Resources closed");

  process.exit(0);
});
