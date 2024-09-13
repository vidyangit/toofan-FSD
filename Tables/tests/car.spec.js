const { test, expect } = require('@playwright/test');

test('Verify Page Heading', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://127.0.0.1:5500/Car1.html'); 

    // Check if the heading is present and centered
    const heading = await page.locator('h1');
    await expect(heading).toHaveText('Car Information Table');
    await expect(heading).toHaveCSS('text-align', 'center');
});



test('Verify rowspan Attribute in Table', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://127.0.0.1:5500/Car1.html'); // Replace with your local server URL

    // Select the cell with rowspan attribute
    const rowspanCell = page.locator('table >> text="Ford"');

    // Verify the rowspan attribute
    const rowspanAttribute = await rowspanCell.evaluate(node => node.getAttribute('rowspan'));
    await expect(rowspanAttribute).toBe('3'); // Verify that rowspan is set to 3

    // Ensure the rowspan cell spans across 3 rows
    const rowsWithRowspan = await page.locator('table tr').count();
    const rowspanCellRowIndex = await rowspanCell.evaluate(node => {
        const row = node.closest('tr');
        if (row) {
            return Array.from(row.parentElement.children).indexOf(row);
        }
        return -1;
    });

    // Check if the rowspan cell spans across the correct number of rows
    const expectedRows = 3;
    const rowspanEndIndex = rowspanCellRowIndex + parseInt(rowspanAttribute, 10);
    await expect(rowspanEndIndex).toBeLessThanOrEqual(rowsWithRowspan);
});

