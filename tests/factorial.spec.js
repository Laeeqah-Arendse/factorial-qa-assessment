const { test, expect } = require('@playwright/test');

// TC01 - Factorial of 5
test('TC01: factorial of 5', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('120');
});

// TC02 - Factorial of 0
test('TC02: factorial of 0', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '0');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('1');
});

// TC03 - Factorial of 12
test('TC03: factorial of 12', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '12');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('479001600');
});

// TC04 - Negative input
test('TC04: negative input validation', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '-1');
  await page.click('#getFactorial');
  // Expected behavior (will fail because app silently fails)
  await expect(page.locator('#resultDiv')).toHaveText('Please enter a non-negative integer');
});

// TC05 - Decimal input
test('TC05: decimal input validation', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '3.5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toHaveText('Decimals are not allowed. Please enter an integer');
});

// TC06 - Text input
test('TC06: text input validation', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', 'abc');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toHaveText('Invalid input. Please enter an integer');
});

// TC07 - Empty input
test('TC07: empty input validation', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toHaveText('Please enter an integer');
});

// TC08 - Large number (valid boundary)
test('TC08: large number handling', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '170');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).not.toContainText('Error');
});

// TC09 - Overflow bug
test('TC09: overflow handling', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '171');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toHaveText('Number too large to calculate factorial');
});

// TC10 - Extremely large input
test('TC10: extremely large input', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '1000');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toHaveText('Number too large to calculate factorial');
});

// TC11 - Enter key submission
test('TC11: submit using Enter key', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '5');
  await page.press('#number', 'Enter');
  await expect(page.locator('#resultDiv')).toHaveText('120');
});

// TC12 - Links visible
test('TC12: verify links', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  const links = page.locator('a');
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    await expect(links.nth(i)).toBeVisible();
  }
});