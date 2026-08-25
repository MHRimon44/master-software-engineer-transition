function heavyCalculation() {
  let total = 0;

  for (let i = 0; i < 20_000_000_000; i++) {
    total += i;
  }

  return total;
}

console.time("main-thread-work");

setInterval(() => {
  console.log("tick");
}, 1000);

heavyCalculation();

console.timeEnd("main-thread-work");
