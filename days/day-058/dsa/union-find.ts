class UnionFind {
  private parent: number[];
  private size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  // Find the root of a node
  find(x: number): number {
    const parent = this.parent[x];
    if (parent === undefined) throw new RangeError(`Invalid node: ${x}`);

    if (parent !== x) {
      this.parent[x] = this.find(parent);
    }

    return this.parent[x]!;
  }

  // Connect two groups
  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) {
      return false;
    }

    // Attach smaller group to larger group
    if (this.size[rootA]! < this.size[rootB]!) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    this.size[rootA] = this.size[rootA]! + this.size[rootB]!;

    return true;
  }

  // Check whether two nodes are connected
  connected(a: number, b: number): boolean {
    return this.find(a) === this.find(b);
  }
}

// Testing
const uf = new UnionFind(5);

uf.union(0, 1);
uf.union(1, 2);
uf.union(3, 4);

console.log(uf.connected(0, 2)); // true
console.log(uf.connected(0, 4)); // false

uf.union(2, 4);

console.log(uf.connected(0, 4)); // true
