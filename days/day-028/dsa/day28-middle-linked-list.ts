class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null,
  ) {}
}

function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}

function printList(head: ListNode | null): void {
  const values: number[] = [];
  let current = head;

  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }

  console.log(values.join(" -> "));
}

const oddList = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);

const evenList = new ListNode(
  1,
  new ListNode(
    2,
    new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))),
  ),
);

console.log("Odd list:");
printList(oddList);

console.log("Middle:", middleNode(oddList)?.val);

console.log("");

console.log("Even list:");
printList(evenList);

console.log("Middle:", middleNode(evenList)?.val);
