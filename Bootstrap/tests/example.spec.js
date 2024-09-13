const { test, expect } = require('@playwright/test');

// Test for desktop screen size
test('Grid layout on desktop screen', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/solution.html');
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const kittenColumn = await page.$('.col-md-4:nth-child(1)');
    const puppyColumn = await page.$('.col-md-4:nth-child(2)');
    const bunnyColumn = await page.$('.col-md-4:nth-child(3)');
    
    expect(kittenColumn).not.toBeNull();
    expect(puppyColumn).not.toBeNull();
    expect(bunnyColumn).not.toBeNull();
});

// Test for tablet screen size
test('Grid layout on tablet screen', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/solution.html');
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const firstRowColumns = await page.$$eval('.row .col-sm-6:nth-child(-n+2)', cols => cols.length);
    const secondRowColumn = await page.$eval('.row .col-sm-6:nth-child(3)', col => col !== null);
    
    expect(firstRowColumns).toBe(2);
    expect(secondRowColumn).toBeTruthy();
});

// Test for mobile screen size
test('Grid layout on mobile screen', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/solution.html');
    await page.setViewportSize({ width: 375, height: 667 });
    
    const columnsStacked = await page.$$eval('.row .col-xs-12', cols => cols.length);
    
    expect(columnsStacked).toBe(3);
});
