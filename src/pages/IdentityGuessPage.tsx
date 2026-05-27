import { Navigate, useNavigate } from 'react-router-dom'
import { v3RoleForRuntimeId } from '../data/narrative/v3'
import { npcProfiles } from '../data/npcs'
import { roleById } from '../data/roles'
import { ui } from '../data/uiCopy'
import { useGameStore } from '../store/gameStore'
import { localize } from '../types/i18n'
import type { RoleId } from '../types/role'
import type { IdentityGuess } from '../types/world'

const guessOptions: Array<{
  value: IdentityGuess
  label: keyof typeof ui
}> = [
  { value: 'humanSlot', label: 'guessHumanSlot' },
  { value: 'aiAgent', label: 'guessAiAgent' },
  { value: 'fixedNpc', label: 'guessFixedNpc' },
  { value: 'systemProxy', label: 'guessSystemProxy' },
  { value: 'uncertain', label: 'guessUncertain' },
]

export function IdentityGuessPage() {
  const navigate = useNavigate()
  const {
    language,
    session,
    setIdentityGuess,
    completeIdentityGuess,
  } = useGameStore()

  if (!session) return <Navigate to="/roles" replace />
  if (session.status !== 'finished') return <Navigate to="/board" replace />
  if (session.identityGuessSubmitted) return <Navigate to="/report" replace />

  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const targets = (Object.keys(roleById) as RoleId[]).filter(
    (roleId) => roleId !== session.roleId,
  )
  const completedCount = targets.filter(
    (roleId) => session.identityGuesses[roleId] !== undefined,
  ).length

  const finish = (skipped = false) => {
    completeIdentityGuess(skipped)
    navigate('/report')
  }

  return (
    <main className="identity-guess-page">
      <section className="guess-hero panel">
        <p className="eyebrow">{t('identityCheckpoint')}</p>
        <h1>{t('identityGuessHeading')}</h1>
        <p>{t('identityGuessIntro')}</p>
        <p className="guess-warning">{t('identityGuessWarning')}</p>
      </section>
      <section className="guess-roster" aria-label={t('identityGuessHeading')}>
        {targets.map((roleId) => {
          const actorName = localize(npcProfiles[roleId].callSign, language)
          const selectedGuess = session.identityGuesses[roleId]

          return (
            <article className="guess-card panel" key={roleId}>
              <header>
                <strong>{actorName}</strong>
                <span>
                  {language === 'zhCN'
                    ? v3RoleForRuntimeId(roleId).name
                    : localize(roleById[roleId].name, language)}
                </span>
              </header>
              <div
                className="guess-options"
                role="group"
                aria-label={`${actorName} / ${t('identityJudgment')}`}
              >
                {guessOptions.map((option) => (
                  <button
                    key={option.value}
                    className={
                      selectedGuess === option.value ? 'selected' : undefined
                    }
                    aria-pressed={selectedGuess === option.value}
                    onClick={() => setIdentityGuess(roleId, option.value)}
                  >
                    {t(option.label)}
                  </button>
                ))}
              </div>
            </article>
          )
        })}
      </section>
      <footer className="guess-actions panel">
        <p>
          {t('identityGuessProgress')}: {completedCount}/{targets.length}
        </p>
        <div>
          <button className="secondary-button" onClick={() => finish(true)}>
            {t('skipIdentityGuess')}
          </button>
          <button className="primary-button" onClick={() => finish()}>
            {t('submitIdentityGuess')}
          </button>
        </div>
      </footer>
    </main>
  )
}
