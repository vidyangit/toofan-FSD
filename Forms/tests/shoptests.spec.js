const { test, expect } = require('@playwright/test');

test('Testcase:1 should allow entering the buyer\'s name', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/shop1.html');

    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('Ngit');

    await expect(nameInput).toHaveValue('Ngit');
});


test('Testcase:2 should update the age output when the slider is moved', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/shop1.html');

    const ageSlider = page.locator('input[name="myAge"]');
    const ageOutput = page.locator('output[for="myAge"]');

    await ageSlider.fill('25');
    
    await expect(ageOutput).toHaveText('25');
});




test('Testcase:3 should verify that the email input field is of type email', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/shop1.html');


    const emailInput = page.locator('input#myEmail');
    await expect(emailInput).toHaveAttribute('type', 'email');
});



test('Testcase:4 should reset all form fields when the Clear Order Form button is clicked', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/shop1.html');

 
    await page.locator('input[name="name"]').fill('John Doe');
    await page.locator('input[name="myEmail"]').fill('john.doe@example.com');
    await page.locator('input[name="address"]').fill('123 Fake Street');
    await page.locator('input[name="city"]').fill('Faketown, FS 12345');
    await page.locator('input[name="popcorn"]').fill('2');
    await page.locator('input[name="caramel-popcorn"]').fill('3');
    await page.locator('input[name="toffies"]').fill('1');
    await page.locator('input[name="snickers"]').fill('4');
    await page.locator('input[name="myAge"]').fill('25');

    // Click the Clear Order Form button
    await page.locator('input[type="reset"]').click();

    // Verify that all fields are reset to their default values
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="myEmail"]')).toHaveValue('');
    await expect(page.locator('input[name="address"]')).toHaveValue('');
    await expect(page.locator('input[name="city"]')).toHaveValue('');
    await expect(page.locator('input[name="popcorn"]')).toHaveValue('');
    await expect(page.locator('input[name="caramel-popcorn"]')).toHaveValue('');
    await expect(page.locator('input[name="toffies"]')).toHaveValue('');
    await expect(page.locator('input[name="snickers"]')).toHaveValue('');
    await expect(page.locator('input[name="myAge"]')).toHaveValue('13'); // assuming '13' is the default starting value for the slider
    await expect(page.locator('input[value="debit"]')).toBeChecked();
});
