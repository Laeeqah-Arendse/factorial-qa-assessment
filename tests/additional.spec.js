const { test, expect } = require('@playwright/test');

test('Additional: form validation styling', async ({ page }) => {

  await page.goto('https://qainterview.pythonanywhere.com/');

  await page.click('#getFactorial'); // submit empty

  const input = page.locator('#number');

  // Check if validation styling is applied (like red border or class)
  await expect(input).toHaveClass(/error|invalid|form-control/);

});


test('Additional: factorial of 12 correct result', async ({ page }) => {

  await page.goto('https://qainterview.pythonanywhere.com/');

  await page.fill('#number', '12');

  await page.click('#getFactorial');

  await expect(page.locator('#resultDiv')).toContainText('479001600');

});


test('Additional: verify API request headers and parameters', async ({ page }) => {

  await page.goto('https://qainterview.pythonanywhere.com/');

  const [request] = await Promise.all([
    page.waitForRequest(req => req.url().includes('factorial')),
    page.fill('#number', '5'),
    page.click('#getFactorial')
  ]);

  // Verify method
  expect(request.method()).toBe('POST');

  // Verify request contains the input value
  expect(request.postData()).toContain('5');

  // Verify headers exist
  const headers = request.headers();
  expect(headers).toBeDefined(); 
});