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
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('LINXIA ENVELOPE INCIDENT')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Begin in the Rain' }))
    await user.click(
      screen.getAllByRole('button', { name: 'Select and receive briefing' })[0],
    )
    expect(screen.getByText(/Private Role Briefing/)).toBeInTheDocument()
    expect(screen.getByText('Investigator')).toBeInTheDocument()
  })

  it('uses V3 entry copy without revealing seat control types', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText('第七街区：真人测试')).toBeInTheDocument()
    expect(screen.getByText(/欢迎进入第七街区夜局/)).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: '进入夜局' }))

    expect(screen.getAllByText('外来调查者').length).toBeGreaterThan(0)
    expect(screen.getAllByText('林夏保护者').length).toBeGreaterThan(0)
    expect(screen.queryByText('AI 演出')).not.toBeInTheDocument()

    await user.click(
      screen.getAllByRole('button', { name: '选择并接收简报' })[0],
    )

    expect(screen.getByText(/你收到邀请时/)).toBeInTheDocument()
    expect(
      screen.getByText(/至少识别一名正在误导公共频道的角色/),
    ).toBeInTheDocument()
  })

  it('shows inspectable street state after entering the night session', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/roles']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(
      screen.getAllByRole('button', { name: '选择并接收简报' })[0],
    )
    await user.click(screen.getByRole('button', { name: '进入现场' }))

    expect(screen.getByText('街区状态')).toBeInTheDocument()
    expect(screen.getByText('街区热度')).toBeInTheDocument()
    expect(screen.getByText('管理员关注')).toBeInTheDocument()
    expect(screen.getByText('证据风险')).toBeInTheDocument()
    expect(screen.getByText('公共舆论')).toBeInTheDocument()
    expect(screen.queryByText(/AI Agent/)).not.toBeInTheDocument()
    expect(screen.queryByText(/固定 NPC/)).not.toBeInTheDocument()
    expect(screen.queryByText(/系统代理/)).not.toBeInTheDocument()
  })
})
