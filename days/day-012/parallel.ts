function fetchProduct(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Product ${id}`);
    }, 1000);
  });
}

async function main() {
  console.time("Parallel");

  const [product1, product2, product3] = await Promise.all([
    fetchProduct(1),
    fetchProduct(2),
    fetchProduct(3),
  ]);

  console.log(product1);
  console.log(product2);
  console.log(product3);

  console.timeEnd("Parallel");
}

main();
