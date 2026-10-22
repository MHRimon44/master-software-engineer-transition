class MyQueue {
  private inputStack: number[] = [];
  private outputStack: number[] = [];

  // Add element to queue
  push(x: number): void {
    this.inputStack.push(x);
  }

  // Transfer elements only when needed
  private transferIfNeeded(): void {
    if (this.outputStack.length > 0) {
      return;
    }

    while (this.inputStack.length > 0) {
      const value = this.inputStack.pop()!;

      this.outputStack.push(value);
    }
  }

  // Remove front element
  pop(): number | undefined {
    this.transferIfNeeded();

    return this.outputStack.pop();
  }

  // Read front element
  peek(): number | undefined {
    this.transferIfNeeded();

    return this.outputStack[this.outputStack.length - 1];
  }

  // Check if queue is empty
  empty(): boolean {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}

// Test cases

const queue = new MyQueue();

queue.push(10);
queue.push(20);
queue.push(30);

console.log('Peek:', queue.peek());
console.log('Pop:', queue.pop());
console.log('Peek:', queue.peek());
console.log('Pop:', queue.pop());
console.log('Pop:', queue.pop());
console.log('Empty:', queue.empty());
