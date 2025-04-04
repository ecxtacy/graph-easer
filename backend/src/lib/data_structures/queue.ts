import { ListNode } from "./linked_list";

export class Queue {
  private _size: number;
  private F: ListNode | null;
  private R: ListNode | null;

  constructor() {
    this.F = null;
    this.R = null;
    this._size = 0;
  }

  private _push(node: ListNode) {
    if (this.F === null || this.R === null) {
      this.F = node;
      this.R = node;
    } else {
      this.R.next = node;
      this.R = node;
    }
    this._size++;
  }

  push(node: ListNode | number) {
    if (node instanceof ListNode) {
      this._push(node);
    } else {
      const newNode = new ListNode(node);
      this._push(newNode);
    }
  }

  front() {
    return this.F?.value;
  }

  pop() {
    if (this.F === null) return;

    this._size--;

    if (this.F.next === null) {
      this.F = null;
      return;
    }

    this.F = this.F.next;
  }

  size() {
    return this._size;
  }

  empty() {
    return this._size === 0;
  }

  clear() {
    this._size = 0;
    this.F = null;
    this.R = null;
  }
}
