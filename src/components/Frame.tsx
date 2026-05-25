import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import { PreferenceControls } from './PreferenceControls'

export function Frame({ children }: { children: ReactNode }) {
  const language = useGameStore((state) => state.language)
  return (
    <div className="app-frame">
      <header className="masthead">
        <Link className="brand" to="/">
          <span>{localize(ui.title, language)}</span>
          <small>{localize(ui.subtitle, language)}</small>
        </Link>
        <PreferenceControls />
      </header>
      {children}
    </div>
  )
}
