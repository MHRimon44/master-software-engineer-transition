function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  const indegree = new Array<number>(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    if (
      course === undefined ||
      prerequisite === undefined ||
      !graph[prerequisite] ||
      !graph[course]
    ) {
      throw new RangeError('Invalid course dependency');
    }
    graph[prerequisite]!.push(course);
    indegree[course] = indegree[course]! + 1;
  }

  const queue: number[] = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  const order: number[] = [];
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++]!;
    order.push(current);

    for (const next of graph[current]!) {
      indegree[next] = indegree[next]! - 1;

      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return order.length === numCourses ? order : [];
}

function isValidOrder(numCourses: number, prerequisites: number[][], order: number[]): boolean {
  if (order.length !== numCourses) return false;

  const position = new Map<number, number>();

  for (const [i, course] of order.entries()) {
    if (course < 0 || course >= numCourses || position.has(course)) {
      return false;
    }

    position.set(course, i);
  }

  return prerequisites.every(
    ([course, prerequisite]) =>
      course !== undefined &&
      prerequisite !== undefined &&
      position.get(prerequisite)! < position.get(course)!,
  );
}

const cases = [
  {
    name: 'Simple dependency',
    n: 2,
    prerequisites: [[1, 0]],
    possible: true,
  },
  {
    name: 'Multiple dependencies',
    n: 4,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ],
    possible: true,
  },
  {
    name: 'Cycle',
    n: 2,
    prerequisites: [
      [1, 0],
      [0, 1],
    ],
    possible: false,
  },
  {
    name: 'No prerequisites',
    n: 3,
    prerequisites: [],
    possible: true,
  },
];

for (const testCase of cases) {
  const order = findOrder(testCase.n, testCase.prerequisites);

  const valid = isValidOrder(testCase.n, testCase.prerequisites, order);

  const passed = testCase.possible ? valid : order.length === 0;

  console.log(`${passed ? 'PASS' : 'FAIL'}: ${testCase.name}`, order);

  if (!passed) {
    throw new Error(`Failed: ${testCase.name}`);
  }
}
