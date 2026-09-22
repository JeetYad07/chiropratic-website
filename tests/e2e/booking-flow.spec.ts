import { test, expect } from '@playwright/test';

test.describe('Dr Hashi Chiropractic - Booking Flow E2E', () => {
  test('should navigate from Home to Book page and submit appointment request', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Dr Hashi Chiropractic');

    // 2. Click Book Appointment button
    const bookNavLink = page.getByRole('link', { name: /Book/i }).first();
    await bookNavLink.click();
    await expect(page).toHaveURL(/\/book/);

    // 3. Fill Appointment Form
    await page.getByPlaceholder('e.g. Rahul Sharma').fill('Test Patient');
    await page.getByPlaceholder('e.g. 9876543210').fill('9876543210');
    
    // Select date and time
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.locator('input[type="date"]').fill(dateString);
    await page.locator('select').first().selectOption('Morning (10:00 AM - 1:00 PM)');

    // 4. Verify Form elements exist
    await expect(page.getByRole('button', { name: /Request via WhatsApp/i })).toBeVisible();
  });
});
