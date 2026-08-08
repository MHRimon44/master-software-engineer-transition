# TypeScript Order SDK

This project is part of my Software Engineer learning roadmap.

## Day 1 - Compiler Configuration and Strictness

### What I learned

| Compiler Option              | What it protects against                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `strict`                     | Enables strict type checking and catches unsafe type assumptions.                        |
| `noImplicitAny`              | Prevents parameters or variables from silently becoming `any`.                           |
| `strictNullChecks`           | Prevents using `null` or `undefined` like normal values.                                 |
| `noUncheckedIndexedAccess`   | Reminds me that array or object lookup may return `undefined`.                           |
| `exactOptionalPropertyTypes` | Distinguishes a missing optional property from a property explicitly set to `undefined`. |

## Key Notes

- TypeScript gives compile-time safety, not runtime validation.
- `any` disables type safety.
- `unknown` requires type checking before use.
- `JSON.parse()` does not validate runtime data.
- Type assertions like `as Order` do not validate data.
- Compiler errors can expose missing design decisions.

## Day 1 Practical Work

- Enabled strict TypeScript configuration.
- Fixed unsafe TypeScript examples.
- Avoided `any`, blind assertions, and non-null assertions.
- Verified the project with:

```bash
npm run typecheck
npm run build
```
