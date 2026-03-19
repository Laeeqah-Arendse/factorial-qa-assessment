const { test, expect } = require('@playwright/test');

test('Additional: form validation styling', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');

  await page.click('#getFactorial'); // submit empty

  const input = page.locator('#number');

  await expect(input).toHaveClass(/error|invalid/);

  await expect(input).toHaveCSS('border-color', 'rgb(255, 0, 0)');
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
  page.waitForRequest(req =>
    req.url().includes('factorial') && req.method() === 'POST'
  ),
  page.fill('#number', '5'),
  page.click('#getFactorial')
]);

  expect(request.method()).toMatch(/GET|POST/);

  const postData = request.postData() || '';
  expect(postData.includes('5') || request.url().includes('5')).toBeTruthy();

  const headers = request.headers();
  expect(headers).toBeDefined();

  if (headers['content-type']) {
    expect(headers['content-type']).toContain('application');
  }

  expect(request.url()).toMatch(/factorial|api|calculate/i);
});