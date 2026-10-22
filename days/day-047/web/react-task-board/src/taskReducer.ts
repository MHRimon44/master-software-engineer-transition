export type Task = { id: string; title: string; done: boolean };
export type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clearCompleted' };
export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [action.task, ...state];
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'remove':
      return state.filter((t) => t.id !== action.id);
    case 'clearCompleted':
      return state.filter((t) => !t.done);
  }
}
