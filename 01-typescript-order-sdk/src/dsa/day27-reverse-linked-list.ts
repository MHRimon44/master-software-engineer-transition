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
    const next = current.next;

    current.next = previous;

    previous = current;

    current = next;
  }

  return previous;
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

const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);

console.log("Before:");

printList(head);

const reversed = reverseList(head);

console.log("After:");

printList(reversed);
