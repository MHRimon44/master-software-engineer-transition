# Day 43 — Semantic HTML, Forms and Accessibility

## Project

TaskFlow — Accessible Task Manager

Built using:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser DOM API
- localStorage

No React, Next.js, backend or external dependencies.

## Features

- Create tasks
- Set task priority
- Set optional due date
- Complete and uncomplete tasks
- Delete tasks
- Persist tasks in localStorage
- Keyboard navigation
- Screen-reader announcements
- Responsive layout

## Semantic HTML

- header: Page header
- nav: Navigation links
- main: Primary content
- section: Related content groups
- form: Task creation
- label: Accessible form field names
- button: Native interactive actions
- ul/li: Task collection
- footer: Page footer

## React Native to Web Mapping

| React Native       | Semantic Web                                     |
| ------------------ | ------------------------------------------------ |
| View               | main, section, article, div depending on meaning |
| Text               | p, span, h1-h6, label                            |
| TextInput          | input, textarea                                  |
| Pressable          | button or a for navigation                       |
| FlatList           | ul/li or ol/li                                   |
| ScrollView         | Native document scrolling                        |
| Switch             | input type="checkbox"                            |
| AccessibilityLabel | label, accessible text, aria-label               |
| onPress            | click event                                      |
| StyleSheet         | CSS stylesheets                                  |

## Accessibility Principles

1. Use native HTML elements first.
2. Associate labels with controls.
3. Preserve visible keyboard focus.
4. Support Tab, Shift+Tab, Enter and Space.
5. Use semantic landmarks.
6. Avoid unnecessary ARIA.
7. Announce important status changes.
8. Maintain readable text and contrast.

## Run

From this directory:

```bash
python3 -m http.server 5500
```

Open http://localhost:5500

## Manual Tests

- Add a valid task.
- Try submitting an empty title.
- Try a title shorter than three characters.
- Complete a task.
- Uncomplete a task.
- Delete a task.
- Refresh and verify persistence.
- Navigate using only the keyboard.
- Inspect the accessibility tree in Chrome DevTools.

## Complexity

Day 43 DSA: Lowest Common Ancestor in a BST.

Time: O(h)
Space: O(1)

Where h is the height of the BST.

Balanced BST: O(log n) time.
Skewed BST: O(n) time.

## Why Semantic HTML Matters

Semantic elements provide meaning to browsers,
assistive technologies and developers.

Native HTML controls also provide built-in
keyboard behavior, focus management and validation.
