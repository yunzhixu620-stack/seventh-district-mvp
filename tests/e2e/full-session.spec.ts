import { expect, test } from '@playwright/test'

test('player can enter, investigate, switch language, and close a session', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'EN' }).click()
  await expect(page.getByText('LINXIA ENVELOPE INCIDENT')).toBeVisible()
  await page.getByRole('link', { name: 'Enter District Terminal' }).click()
  await page.locator('.role-option').filter({ hasText: 'Investigator' }).getByRole('button').click()
  await expect(page.getByText('Private Role Briefing')).toBeVisible()
  await page.getByRole('button', { name: 'Enter the scene' }).click()
  await expect(page.getByText('Action Ruling Desk')).toBeVisible()

  await page.getByRole('button', { name: /Probe/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Probe')
  await page.getByRole('button', { name: 'Commit action' }).click()
  await page.getByRole('tab', { name: /Clues/ }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(1)

  await page.locator('select').selectOption('protector')
  await page.getByPlaceholder('Example: probe He Lan about the seal').fill('probe the protector about the safety phrase')
  await page.getByRole('button', { name: 'Interpret intent' }).click()
  await page.getByRole('button', { name: 'Commit action' }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(2)

  await page.getByRole('button', { name: 'Protect' }).click()
  await page.getByRole('button', { name: 'Commit action' }).click()
  await expect(page.getByText('Session Replay Report')).toBeVisible()
  await expect(page.getByText('Action trail')).toBeVisible()
})
