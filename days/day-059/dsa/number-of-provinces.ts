class UnionFind {
  private parent: number[];
  private size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x: number): number {
    const parent = this.parent[x];
    if (parent === undefined) throw new RangeError(`Invalid node: ${x}`);

    if (parent !== x) {
      this.parent[x] = this.find(parent);
    }

    return this.parent[x]!;
  }

  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.size[rootA]! < this.size[rootB]!) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    this.size[rootA] = this.size[rootA]! + this.size[rootB]!;

    return true;
  }
}

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const uf = new UnionFind(n);

  let provinces = n;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i]![j] === 1) {
        if (uf.union(i, j)) {
          provinces--;
        }
      }
    }
  }

  return provinces;
}

console.log(
  findCircleNum([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
); // 2

console.log(
  findCircleNum([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]),
); // 3
