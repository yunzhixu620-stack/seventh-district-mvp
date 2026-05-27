import { expect, test } from '@playwright/test'

test('player can enter, investigate, switch language, and close a session', async ({
  page,
}) => {
  await page.route('**/perform', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        line: 'You finally asked a question worth answering.',
        gesture: 'Lao Zhou rubs rain from the envelope seal.',
        subtext:
          'Your wording made her defensive, but she gave you something concrete.',
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
  await page
    .locator('.role-option')
    .filter({ hasText: 'Investigator' })
    .getByRole('button')
    .click()
  await expect(page.getByText('Private Role Briefing')).toBeVisible()
  await page.getByRole('button', { name: 'Enter the scene' }).click()
  await expect(page.getByText('How Will You Speak?')).toBeVisible()

  await page.getByRole('button', { name: /Probe/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Probe')
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(page.getByText('CHARACTER RESPONSE')).toBeVisible()
  await expect(
    page.getByText('You finally asked a question worth answering.'),
  ).toBeVisible()
  await page.getByRole('tab', { name: /Clues/ }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(1)

  await page.locator('select').selectOption('leaker')
  await page
    .getByPlaceholder(
      'Example: Lao Zhou, you know when that seal was set, do you not?',
    )
    .fill('probe Frequency 7 about the edited post')
  await page.getByRole('button', { name: 'Ready the line' }).click()
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(page.locator('.clue-list article')).toHaveCount(2)

  await page.getByRole('button', { name: /Reveal/ }).click()
  await page.getByRole('button', { name: 'Say it' }).click()
  await expect(
    page.getByText('Before the reveal, who do you think they are?'),
  ).toBeVisible()
  await expect(page.getByText('Role reveal')).not.toBeVisible()
  await page
    .getByRole('group', { name: /Jiang Chi/ })
    .getByRole('button', { name: 'AI Agent' })
    .click()
  await page
    .getByRole('group', { name: /A Ran/ })
    .getByRole('button', { name: 'Fixed NPC' })
    .click()
  await page
    .getByRole('group', { name: /District Admin/ })
    .getByRole('button', { name: 'System Proxy' })
    .click()
  await page.getByRole('button', { name: 'Submit guesses' }).click()
  await expect(page.getByText('Session Replay Report')).toBeVisible()
  await expect(page.getByText('Ruling confirmed')).toBeVisible()
  await expect(page.getByText('Role reveal')).toBeVisible()
  await expect(page.locator('.reveal-card')).toHaveCount(6)
  await expect(page.locator('.reveal-roster')).toContainText('AI Agent')
  await expect(page.locator('.reveal-roster')).toContainText('系统代理')
  await expect(page.getByText('Misdirection sources')).toBeVisible()
  await expect(page.getByText('Identity judgments')).toBeVisible()
  await expect(page.getByText(/Correct: 2/)).toBeVisible()
  await expect(page.getByText(/Misjudged: 1/)).toBeVisible()
  await expect(page.getByText(/Uncertain: 2/)).toBeVisible()
  await expect(page.getByText(/may have shaped your read/)).toBeVisible()
  await expect(page.getByText('Action trail')).toBeVisible()

  await page.getByRole('button', { name: 'Replay with a new role' }).click()
  await expect(page.getByText('Whose Voice Will You Borrow?')).toBeVisible()
})

test('a role cannot shortcut the incident with immediate protection', async ({
  page,
}) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'EN' }).click()
  await page.getByRole('link', { name: 'Begin in the Rain' }).click()
  await page
    .locator('.role-option')
    .filter({ hasText: 'Keeper' })
    .getByRole('button')
    .click()
  await page.getByRole('button', { name: 'Enter the scene' }).click()

  await expect(page.getByText('FINAL RULING LOCKED')).toBeVisible()
  await expect(page.getByText(/Evidence progress 0\/2/)).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Protect', exact: true }),
  ).toBeDisabled()
  await expect(page.locator('select')).not.toHaveValue('keeper')

  await page
    .getByPlaceholder(
      'Example: Lao Zhou, you know when that seal was set, do you not?',
    )
    .fill('protect Zhao Jing now')
  await page.getByRole('button', { name: 'Ready the line' }).click()
  await expect(page.getByRole('dialog')).toContainText(
    'A final call now would be a guess.',
  )
  await expect(
    page.getByRole('dialog').getByRole('button', { name: 'Say it' }),
  ).toBeDisabled()
  await expect(page.getByText('Session Replay Report')).not.toBeVisible()
})

test('street pressure and other roles move after the player acts', async ({
  page,
}) => {
  await page.goto('./')
  await page.getByRole('link', { name: '进入夜局' }).click()
  await page
    .locator('.role-option')
    .filter({ hasText: '外来调查者' })
    .getByRole('button')
    .click()
  await page.getByRole('button', { name: '进入现场' }).click()

  await expect(page.getByText('街区热度')).toBeVisible()
  await expect(page.getByTestId('street-meter-streetHeat')).toHaveAttribute(
    'data-value',
    '12',
  )
  await page.getByRole('button', { name: /询问/ }).click()
  await page.getByRole('button', { name: '说出口' }).click()
  await expect(page.getByTestId('street-meter-streetHeat')).toHaveAttribute(
    'data-value',
    '19',
  )
  await expect(page.getByText('动向').first()).toBeVisible()

  await page.locator('select').selectOption('seeker')
  await page.getByRole('button', { name: /试探/ }).click()
  await page.getByRole('button', { name: '说出口' }).click()
  await page.locator('select').selectOption('leaker')
  await page.getByRole('button', { name: /交换信息/ }).click()
  await page.getByRole('button', { name: '说出口' }).click()

  const publicEvents = page.locator('.message-list article')
  await expect(
    publicEvents
      .filter({ hasText: '老周短暂关闭便利店门口的灯。' })
      .getByText('动向'),
  ).toBeVisible()
  await expect(
    publicEvents
      .filter({
        hasText: '江池向玩家提出交易，用半真半假的信息换取便利店线索。',
      })
      .getByText('动向'),
  ).toBeVisible()
  await expect(page.getByText('舆论').first()).toBeVisible()
  await page.getByRole('tab', { name: '私信' }).click()
  await expect(
    page
      .locator('.message-list article')
      .filter({ hasText: '我有截图。' })
      .getByText('私下行动'),
  ).toBeVisible()
})
