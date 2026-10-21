function fetchProduct(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Keyboard");
    }, 1000);
  });
}

console.log("Start");

fetchProduct()
  .then((product) => {
    console.log(`Product: ${product}`);
  })
  .catch((error: unknown) => {
    console.log("Error: ", error);
  })
  .finally(() => {
    console.log("Finished");
  });

console.log("End");
