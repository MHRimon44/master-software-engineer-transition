class MyQueue {
  private inputStack: number[] = [];
  private outputStack: number[] = [];

  push(x: number): void {
    this.inputStack.push(x);
  }

  private transferIfNeeded(): void {
    if (this.outputStack.length > 0) {
      return;
    }

    while (this.inputStack.length > 0) {
      const value = this.inputStack.pop()!;
      this.outputStack.push(value);
    }
  }

  pop(): number | undefined {
    this.transferIfNeeded();
    return this.outputStack.pop();
  }

  peek(): number | undefined {
    this.transferIfNeeded();

    return this.outputStack[this.outputStack.length - 1];
  }

  empty(): boolean {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}

// Test cases

const queue = new MyQueue();

queue.push(10);
queue.push(20);
queue.push(30);

console.log("Peek:", queue.peek());
console.log("Pop:", queue.pop());
console.log("Peek:", queue.peek());
console.log("Pop:", queue.pop());
console.log("Pop:", queue.pop());
console.log("Empty:", queue.empty());
