import { test, expect } from '@playwright/test';
// The Vite dev server has no backend; intercept at the browser network boundary.
test('a user creates and completes a task', async ({ page }) => {
  await page.route('**/api/tasks', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    }),
  );
  await page.goto('/');
  await expect(page.getByText('No tasks yet')).toBeVisible();
  await page.getByRole('textbox', { name: 'New task' }).fill('Test from browser');
  await page.getByRole('button', { name: 'Add task' }).click();
  await expect(page.getByText('Test from browser')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Test from browser' }).check();
  await expect(page.getByRole('checkbox', { name: 'Test from browser' })).toBeChecked();
});
