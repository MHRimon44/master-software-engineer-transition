class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode();
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }

    current = current.next;
  }

  current.next = list1 ?? list2;

  return dummy.next;
}

function fromArray(values: number[]): ListNode | null {
  const dummy = new ListNode();
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

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

const list1 = fromArray([1, 2, 4]);
const list2 = fromArray([1, 3, 4]);

const merged = mergeTwoLists(list1, list2);

console.log(toArray(merged));
