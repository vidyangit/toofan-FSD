const { test, expect } = require('@playwright/test');

test.describe('TrendyTrinkets CRUD Operations', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('http://127.0.0.1:5500/index.html'); // Replace with the actual URL if different
  });

  test('should not add a row to the table if fields are empty', async ({ page }) => {
    // Fill out the form with empty fields
    await page.fill('#productCode', '');
    await page.fill('#product', '');
    await page.fill('#qty', '');
    await page.fill('#perPrice', '');
    
    // Click the Submit button
    await page.click('input[type="submit"]');
    
    // Get the number of rows in the table
    const rowsBefore = await page.locator('#storeList tbody tr').count();
    
    // Verify that no new row has been added
    expect(rowsBefore).toBe(0); 
  });

  test('should show an alert when fields are empty', async ({ page }) => {
    // Intercept the alert dialog
    page.on('dialog', dialog => {
      expect(dialog.message()).toBe('Please fill in all fields.');
      dialog.dismiss(); // Close the alert dialog
    });

    // Fill out the form with empty fields
    await page.fill('#productCode', '');
    await page.fill('#product', '');
    await page.fill('#qty', '');
    await page.fill('#perPrice', '');
    
    // Click the Submit button
    await page.click('input[type="submit"]');
    
    
  });
});
