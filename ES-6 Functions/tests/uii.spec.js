const { test, expect } = require('@playwright/test');

test.describe('Form Submission and Table Update', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  test('Testcase:1 Fill and submit the form', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="productCode"]', 'P001');
    await page.fill('input[name="product"]', 'Trendy Watch');
    await page.fill('input[name="qty"]', '5');
    await page.fill('input[name="perPrice"]', '150');

    // Submit the form
    await page.click('input[type="submit"]');

    // Add a delay to ensure form submission completes
    await page.waitForTimeout(1000); // Wait for 1 second
  });

  test('Testcase:2 Check table update after form submission', async ({ page }) => {
    // Ensure the form is filled and submitted
    await page.fill('input[name="productCode"]', 'P001');
    await page.fill('input[name="product"]', 'Trendy Watch');
    await page.fill('input[name="qty"]', '5');
    await page.fill('input[name="perPrice"]', '150');
    await page.click('input[type="submit"]');

    // Increase the timeout for waiting
    await page.waitForSelector('#storeList tbody tr', { timeout: 60000 }); // Wait for up to 60 seconds

    // Check that 'P001' is in the product code column
    const productCodes = await page.$$eval('#storeList tbody tr td:nth-child(1)', tds => tds.map(td => td.textContent));
    expect(productCodes).toContain('P001');
  });

  test('Testcase:3 Ensure only correct product code is present', async ({ page }) => {
    // Ensure the form is filled and submitted
    await page.fill('input[name="productCode"]', 'P001');
    await page.fill('input[name="product"]', 'Trendy Watch');
    await page.fill('input[name="qty"]', '5');
    await page.fill('input[name="perPrice"]', '150');
    await page.click('input[type="submit"]');

    // Increase the timeout for waiting
    await page.waitForSelector('#storeList tbody tr', { timeout: 60000 }); // Wait for up to 60 seconds

   
  });
});
