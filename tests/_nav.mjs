// Test helper for the shared course navigation: opens the sheet (phones) and the lesson's module when closed, then clicks the lesson.
export async function pick(page, n) {
  const a = page.locator(`.cn-lesson[data-lesson="${n}"]`).first();
  const t = page.locator(".sidebar-toggle");
  if ((await t.isVisible()) && (await t.getAttribute("aria-expanded")) !== "true") await t.click();
  const h = page.locator(".cn-mod").filter({ has: a }).locator(".cn-mod-h").first();
  if ((await h.getAttribute("aria-expanded")) !== "true") { await h.click(); await page.waitForTimeout(260); }
  await a.click();
}
