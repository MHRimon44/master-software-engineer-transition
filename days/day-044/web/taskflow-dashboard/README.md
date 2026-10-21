# Day 44 — TaskFlow Dashboard

## Topic

CSS Cascade, Box Model and Flexbox.

## Objective

Build a responsive dashboard using semantic HTML,
vanilla CSS and JavaScript.

## Features

- Responsive dashboard
- Sidebar navigation
- Statistics cards
- Add tasks
- Complete tasks
- Delete tasks
- Task progress
- LocalStorage persistence
- Light and dark themes
- Keyboard accessible form

## CSS Concepts

### Cascade

The browser determines which CSS declarations
apply based on origin, importance, cascade layers,
specificity, scoping proximity and source order.

### Specificity

.nav-link has specificity (0,1,0).

.side-nav .nav-link has specificity (0,2,0).

The second selector wins when the other cascade
conditions are equal.

### Box Model

An element consists of:

1. Content
2. Padding
3. Border
4. Margin

Using box-sizing: border-box includes padding
and border inside the declared width.

### Flexbox

display: flex creates a flex formatting context.

justify-content aligns items on the main axis.

align-items aligns items on the cross axis.

flex-wrap allows items to move onto new lines.

## React Native vs Web CSS

1. React Native defaults to column flex direction,
   while CSS flex containers default to row.

2. React Native uses StyleSheet objects;
   the web uses selectors and the cascade.

3. React Native uses device-independent layout units;
   the web supports px, rem, %, vw, vh and more.

4. The browser has a normal document flow;
   React Native primarily uses Flexbox layout.

5. Browser CSS has specificity and inheritance,
   unlike React Native's usual style resolution.

## Manual Testing

- Add a task
- Complete a task
- Delete a task
- Refresh the page
- Verify persistence
- Switch dark mode
- Test keyboard navigation
- Inspect CSS specificity
- Inspect box model
- Test 375px, 768px, 1024px and 1440px widths

## Run

From this folder:

python3 -m http.server 5502

Open:

http://localhost:5502

## DSA

Binary Tree Level Order Traversal.

Algorithm: BFS.

Time: O(n).

Space: O(n).
