import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { useGameStore } from './store/gameStore'

describe('playable navigation and localization', () => {
  beforeEach(() => {
    localStorage.clear()
    useGameStore.setState({
      language: 'zhCN',
      audioEnabled: false,
      seed: 'D7-NIGHT',
      selectedRoleId: undefined,
      session: undefined,
      pendingAction: undefined,
    })
  })

  it('switches language and reaches a private briefing', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><App /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('LINXIA ENVELOPE INCIDENT')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Enter District Terminal' }))
    await user.click(screen.getAllByRole('button', { name: 'Select and receive briefing' })[0])
    expect(screen.getByText(/Private Role Briefing/)).toBeInTheDocument()
    expect(screen.getByText('Investigator')).toBeInTheDocument()
  })
})
