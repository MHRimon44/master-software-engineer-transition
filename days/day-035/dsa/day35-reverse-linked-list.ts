/**
 * Day 35: Reverse Linked List
 *
 * Time: O(n)
 * Space: O(1) for reversal
 */

class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null,
  ) {}
}

function reverseList(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    const nextNode: ListNode | null = current.next;

    current.next = previous;

    previous = current;
    current = nextNode;
  }

  return previous;
}

function arrayToList(values: number[]): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;

  for (const value of values) {
    tail.next = new ListNode(value);
    tail = tail.next;
  }

  return dummy.next;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

function runTest(input: number[], expected: number[]): void {
  const head = arrayToList(input);
  const reversed = reverseList(head);
  const actual = listToArray(reversed);

  const passed = JSON.stringify(actual) === JSON.stringify(expected);

  console.log(
    `${passed ? 'PASS' : 'FAIL'} | ${JSON.stringify(input)} => ${JSON.stringify(actual)}`,
  );

  if (!passed) {
    throw new Error(`Expected ${JSON.stringify(expected)}`);
  }
}

runTest([1, 2, 3, 4], [4, 3, 2, 1]);
runTest([1, 2], [2, 1]);
runTest([5], [5]);
runTest([], []);
runTest([1, 1, 2], [2, 1, 1]);

console.log('All Day 35 DSA tests passed!');
