# Day 47 — React Task Board

React refresh: controlled forms, useReducer, useContext, useEffect, useRef, custom hooks and component composition.

## Start

From the `days/day-047/web/react-task-board` folder:

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Open the localhost URL printed by Vite (typically port 5173).

## Architecture

- `taskReducer.ts`: pure immutable state transitions.
- `TaskForm`: controlled input, native validation and focus via ref.
- `TaskList`: presentational component.
- `ThemeContext.tsx`: theme is shared between distant components.
- `usePersistentReducer.ts`: custom hook, `useEffect` syncs reducer state with localStorage.
- `App.tsx`: completed count and filtered list are derived during render (no effect).

## Error boundaries

React error boundaries catch render errors in descendants, but not event-handler exceptions. They are commonly implemented as a class component or via a library. This exercise covers the concept without adding a library.

## Manual tests

1. Add a task with 3+ characters.
2. Try invalid short input.
3. Toggle task and inspect derived counts.
4. Filter All/Active/Done.
5. Delete and clear completed.
6. Refresh and verify persistence.
7. Switch theme, refresh, and verify persistence.
8. Use keyboard Tab/Enter/Space.
9. Inspect React DevTools and confirm no effect for computed counts.

## DSA

`days/day-047/dsa/day47-top-k-frequent.ts` implements LeetCode 347 with a min-heap. Time O(n log k), space O(n+k). Redo Day 46 Kth Largest from memory.
