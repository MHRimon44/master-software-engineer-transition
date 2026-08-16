const valid = false;

if (!valid) {
  console.error("Configuration invalid.");
  process.exitCode = 1;
} else {
  console.log("Configuration valid.");
}
