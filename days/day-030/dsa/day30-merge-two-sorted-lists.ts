class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number, next: ListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}

function mergeTwoSortedLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;

  let left = list1;
  let right = list2;

  while (left !== null && right !== null) {
    if (left.value <= right.value) {
      current.next = left;
      left = left.next;
    } else {
      current.next = right;
      right = right.next;
    }

    current = current.next;
  }

  current.next = left ?? right;

  return dummy.next;
}

function createList(values: number[]): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;

  for (const value of values) {
    current.next = new ListNode(value);
    current = current.next;
  }

  return dummy.next;
}

function toArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}

const list1 = createList([1, 2, 4]);
const list2 = createList([1, 3, 4]);

const merged = mergeTwoSortedLists(list1, list2);

console.log(toArray(merged));
