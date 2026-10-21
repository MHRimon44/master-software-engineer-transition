# Day 46 — BrowserLab

## Learning objectives

- DOM event capture, target and bubbling
- URLSearchParams, pushState, replaceState and popstate
- Cookie vs localStorage vs sessionStorage
- Cross-origin request and preflight
- Security notes for XSS, CSRF and auth storage

## Run in two terminals

Terminal A (inside this folder): `python3 -m http.server 5504`
Terminal B (inside this folder): `python3 cors-server.py`
Open `http://localhost:5504` (use **localhost**, not 127.0.0.1, for this demo).

## Exercises

1. Save URL query, refresh, use Back/Forward; observe popstate.
2. Save a preference in each storage mechanism. Refresh and open a new tab to compare lifetimes.
3. Click the event target with and without stopPropagation; compare logs.
4. Run denied, allowed and preflight requests; inspect DevTools Network and Console.
5. Write three sentences explaining why CORS does not replace authentication.

## Security

Only store mock non-sensitive preferences. HttpOnly cookies must be set by a server and cannot be created as HttpOnly using JavaScript. SameSite is not a universal CSRF solution. CORS is not authorization. `localStorage` and `sessionStorage` are readable by scripts running on the origin.

## DSA

Kth Largest Element in an Array (LeetCode 215), min-heap of size k. Time O(n log k), space O(k). Redo Day 44 BFS from memory.
