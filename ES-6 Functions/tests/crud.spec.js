// tests/crud.spec.js
const { test, expect } = require('@playwright/test');

test.describe('CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the page containing your HTML form
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  test('Submit form and check table update', async ({ page }) => {
    // Fill out the form
    await page.pause();
    await page.fill('input[name="productCode"]', 'P001');
    await page.fill('input[name="product"]', 'Trendy Watch');
    await page.fill('input[name="qty"]', '5');
    await page.fill('input[name="perPrice"]', '150');

    // Submit the form
    await page.click('input[type="submit"]');
    const productCodes = await page.$$eval('#storeList tbody tr td:nth-child(1)', tds => tds.map(td => td.textContent));
    expect(productCodes).toEqual(['P001']);

    // Check if the table was updated with the new product
    const productCode = await page.textContent('#storeList tbody tr td:nth-child(1)');
    const productName = await page.textContent('#storeList tbody tr td:nth-child(2)');
    const qty = await page.textContent('#storeList tbody tr td:nth-child(3)');
    const price = await page.textContent('#storeList tbody tr td:nth-child(4)');

    expect(productCode).toBe('P001');
    expect(productName).toBe('Trendy Watch');
    expect(qty).toBe('5');
    expect(price).toBe('150');
  });

  test('Reset form and check if fields are cleared', async ({ page }) => {
    // Fill out the form
    await page.pause();
    await page.fill('input[name="productCode"]', 'P002');
    await page.fill('input[name="product"]', 'Stylish Hat');
    await page.fill('input[name="qty"]', '10');
    await page.fill('input[name="perPrice"]', '50');

    // Reset the form
    await page.click('input[type="reset"]');

    // Check if the form fields are cleared
    const productCode = await page.inputValue('input[name="productCode"]');
    const productName = await page.inputValue('input[name="product"]');
    const qty = await page.inputValue('input[name="qty"]');
    const price = await page.inputValue('input[name="perPrice"]');

    expect(productCode).toBe('');
    expect(productName).toBe('');
    expect(qty).toBe('');
    expect(price).toBe('');
  });

  
});


