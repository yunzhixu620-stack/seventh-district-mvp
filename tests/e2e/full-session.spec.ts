import { expect, test } from '@playwright/test'

test('player can enter, investigate, switch language, and close a session', async ({ page }) => {
  await page.route('**/perform', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        line: 'You finally asked a question worth answering.',
        gesture: 'He Lan rubs rain from the envelope seal.',
        subtext: 'Your wording made her defensive, but she gave you something concrete.',
        mood: 'guarded',
        model: 'test-live-actor',
        mode: 'live',
      }),
    })
  })
  await page.goto('./')
  await page.getByRole('button', { name: 'EN' }).click()
  await expect(page.getByText('LINXIA ENVELOPE INCIDENT')).toBeVisible()
  await page.getByRole('link', { name: 'Begin in the Rain' }).click()
  await expect(page.getByText('People in the Rain Tonight')).toBeVisible()
  await expect(page.locator('.cast-roster .portrait')).toHaveCount(6)
  await page.locator('.role-option').filter({ hasText: 'Investigator' }).getByRole('button').click()
  await expect(page.getByText('Private Role Briefing')).toBeVisible()
  await page.getByRole('button', { name: 'Enter the scene' }).click()
  await expect(page.getByText('How Will You Speak?')).toBeVisible()

  await page.getByRole('button', { name: /Probe/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Probe')
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(page.getByText('LIVE AI RESPONSE')).toBeVisible()
  await expect(page.getByText('You finally asked a question worth answering.')).toBeVisible()
  await page.getByRole('tab', { name: /Clues/ }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(1)

  await page.locator('select').selectOption('leaker')
  await page.getByPlaceholder('Example: He Lan, you know when that seal was set, do you not?').fill('probe Frequency 7 about the edited post')
  await page.getByRole('button', { name: 'Ready the line' }).click()
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(2)

  await page.getByRole('button', { name: /Reveal/ }).click()
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(page.getByText('Session Replay Report')).toBeVisible()
  await expect(page.getByText('Safe Resolution')).toBeVisible()
  await expect(page.getByText('Action trail')).toBeVisible()

  await page.getByRole('button', { name: 'Replay with a new role' }).click()
  await expect(page.getByText('Whose Voice Will You Borrow?')).toBeVisible()
})
