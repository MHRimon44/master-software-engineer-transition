function fetchProduct(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Product service unavailable"));
    }, 1000);
  });
}

async function main() {
  try {
    console.log("Fetch product...");
    const product = await fetchProduct();
    console.log("Product:", product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("Unknown error");
    }
  } finally {
    console.log("Request finished");
  }
}

main();
