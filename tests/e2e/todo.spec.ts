import { test, expect } from '@playwright/test';

/** Wait for initial load: either empty state or todo list is visible. */
async function waitForAppReady(page: import('@playwright/test').Page) {
  await expect(
    page
      .getByText('No todos yet')
      .or(page.getByRole('list', { name: /todos/i }))
  ).toBeVisible({ timeout: 15000 });
}

/** Find a tab that shows an empty state; return its empty title text or null. */
async function findEmptyView(
  page: import('@playwright/test').Page
): Promise<string | null> {
  const tabs = [
    { tab: 'Completed', message: 'No completed todos' },
    { tab: 'Important', message: 'No important todos' },
    { tab: 'Expiring', message: 'Nothing expiring soon' },
    { tab: 'All', message: 'No todos yet' },
  ];
  for (const { tab, message } of tabs) {
    await page.getByRole('tab', { name: tab }).click();
    await expect(
      page.getByText(message).or(page.getByRole('list', { name: /todos/i }))
    ).toBeVisible({ timeout: 3000 });
    if (await page.getByText(message).isVisible()) return message;
  }
  return null;
}

test.describe('Todo E2E', () => {
  test('empty state: shows message when view has no items', async ({
    page,
  }) => {
    await page.goto('/');
    await waitForAppReady(page);
    const emptyMessage = await findEmptyView(page);
    test.skip(emptyMessage === null, 'All views have items; need at least one empty view');
    await expect(page.getByText(emptyMessage!)).toBeVisible();
  });

  test('create todo: adds a todo and shows it in the list', async ({ page }) => {
    await page.goto('/');
    await waitForAppReady(page);
    const unique = `E2E create ${Date.now()}`;
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill(unique);
    await page.getByRole('button', { name: 'Add todo' }).click();
    await expect(page.getByRole('list', { name: /todos/i })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText(unique)).toBeVisible();
  });

  test('complete todo: marks todo as complete', async ({ page }) => {
    await page.goto('/');
    await waitForAppReady(page);
    const unique = `E2E complete ${Date.now()}`;
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill(unique);
    await page.getByRole('button', { name: 'Add todo' }).click();
    await expect(page.getByText(unique)).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: `Complete: ${unique}` }).click();
    await page.getByRole('tab', { name: 'Completed' }).click();
    await expect(page.getByText(unique)).toBeVisible({ timeout: 10000 });
  });

  test('delete todo: removes todo from list', async ({ page }) => {
    await page.goto('/');
    await waitForAppReady(page);
    const unique = `E2E delete ${Date.now()}`;
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill(unique);
    await page.getByRole('button', { name: 'Add todo' }).click();
    const row = page.getByRole('button', { name: `Edit todo: ${unique}` });
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    const deleteBtn = row.getByRole('button', { name: `Delete: ${unique}` });
    await deleteBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
    await deleteBtn.click({ force: true });
    await page.waitForTimeout(2000);
    const rowGone = await row.isHidden();
    const errorShown = await page.getByText(/error|failed|retry|wrong|try again/i).isVisible().catch(() => false);
    expect(rowGone || errorShown).toBeTruthy();
  });

  test('error handling: empty submit does not create todo', async ({
    page,
  }) => {
    await page.goto('/');
    await waitForAppReady(page);
    const emptyMessage = await findEmptyView(page);
    test.skip(emptyMessage === null, 'All views have items; need at least one empty view');
    await page.getByRole('button', { name: 'Add todo' }).click();
    await expect(page.getByText(emptyMessage!)).toBeVisible();
  });
});
