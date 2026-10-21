# Day 45 — CSS Grid, Responsive Design & Design-System Basics

## Goal

Create a responsive card grid and two-column admin layout using CSS Grid and reusable Button, Input and Card primitives.

## Learn

- Grid tracks and gaps: `grid-template-columns`, `repeat()`, `minmax()`, `gap`.
- `minmax(0, 1fr)` prevents content from forcing an oversized track.
- `repeat(auto-fit, minmax(min(100%, 12rem), 1fr))` adapts columns to available space.
- Responsive breakpoints: 760px and 1050px.
- Tokens in `:root`: color, spacing, radius, typography.
- Primitives: `.btn`, `.field`, `.card`, `.pill`.

## Run

From `days/day-045/web/grid-admin-dashboard`:

```bash
python3 -m http.server 5503
```

Open http://localhost:5503

## Manual QA

- [ ] Create project; see card and metrics update
- [ ] Toggle active/completed; see percentage update
- [ ] Delete project; see count update
- [ ] Refresh; verify localStorage persistence
- [ ] Switch theme; refresh; verify persistence
- [ ] Test at 375px, 768px, 1024px, 1440px
- [ ] Inspect grid overlay and computed `grid-template-columns` in DevTools
- [ ] Test keyboard navigation and form validation
- [ ] Confirm no horizontal page overflow

## DSA: Trees review

Recreate DFS max depth and BFS level order from memory, then redo the weakest previous tree problem (LCA, path sum or BFS). Time complexity: DFS O(n), BFS O(n); space DFS O(h) recursion, BFS O(w) queue excluding output.

## Tradeoffs

CSS Grid handles two-dimensional layout, Flexbox handles one-dimensional alignment. Use `minmax(0, 1fr)` and `min-width:0` for overflow control. `localStorage` is only for demo data, not secrets.

## Git

`git commit -m "feat(web): add responsive grid and ui primitives"`
