const { test, expect } = require('@playwright/test');
const baseURL = process.env.BASE_URL;


test('Testcase-1', async ({ page }) => {
  await page.goto(baseURL);

 const h2Text = await page.textContent('h2');    
    expect(h2Text).toBe('Kittens');
    
const kittenColumn = await page.$('.col-md-4:nth-child(1)');
 expect(kittenColumn).not.toBeNull();

});
