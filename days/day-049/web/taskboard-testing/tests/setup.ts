import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
afterEach(() => {
  cleanup();
});
export const server = setupServer(
  http.get('/api/tasks', () =>
    HttpResponse.json([{ id: 'seed-1', title: 'Review tests', done: false }]),
  ),
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
