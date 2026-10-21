class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head: ListNode | null): boolean {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

// -------------------------
// Test 1: Has cycle
// -------------------------

const node1 = new ListNode(3);
const node2 = new ListNode(2);
const node3 = new ListNode(0);
const node4 = new ListNode(-4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;

console.log("Test 1:", hasCycle(node1));
// Expected: true

// -------------------------
// Test 2: No cycle
// -------------------------

const node5 = new ListNode(1);
const node6 = new ListNode(2);
const node7 = new ListNode(3);

node5.next = node6;
node6.next = node7;

console.log("Test 2:", hasCycle(node5));
// Expected: false

// -------------------------
// Test 3: Single node
// -------------------------

const node8 = new ListNode(1);

console.log("Test 3:", hasCycle(node8));
// Expected: false

// -------------------------
// Test 4: Single node cycle
// -------------------------

const node9 = new ListNode(1);
node9.next = node9;

console.log("Test 4:", hasCycle(node9));
// Expected: true

// -------------------------
// Test 5: Empty list
// -------------------------

console.log("Test 5:", hasCycle(null));
// Expected: false
