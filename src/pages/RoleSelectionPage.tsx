import { useNavigate } from 'react-router-dom'
import { roles, selectableRoles } from '../data/roles'
import { v3RoleForRuntimeId } from '../data/narrative/v3'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import { PixelPortrait } from '../components/PixelPortrait'

export function RoleSelectionPage() {
  const navigate = useNavigate()
  const { language, seed, setSeed, randomizeSeed, chooseRole } = useGameStore()
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const isV3Chinese = language === 'zhCN'
  const englishRoleStory = (role: (typeof roles)[number]) =>
    [
      localize(role.roleFantasy, language),
      `${t('objective')}:`,
      localize(role.personalGoal, language),
    ].join('\n\n')

  const selectRole = (roleId: (typeof selectableRoles)[number]['id']) => {
    chooseRole(roleId)
    navigate('/briefing')
  }

  return (
    <main className="selection-page v2-selection">
      <div className="page-intro">
        <p className="eyebrow">{t('incident')}</p>
        <h1>{t('castTitle')}</h1>
        <p>{t('castIntro')}</p>
        <label className="seed-control">
          <span>{t('seed')}</span>
          <input
            value={seed}
            onChange={(event) => setSeed(event.target.value)}
          />
          <button onClick={randomizeSeed}>{t('randomize')}</button>
        </label>
      </div>
      <div className="selection-heading">
        <h2>{t('rolesHeading')}</h2>
        <p>{t('rolesIntro')}</p>
      </div>
      <section className="cast-roster v3-role-grid" aria-label={t('castTitle')}>
        {roles.map((role) => (
          <article
            key={role.id}
            className={`role-option ${role.selectable ? 'inhabitable' : ''}`}
          >
            <PixelPortrait roleId={role.id} language={language} />
            <p className="eyebrow">
              {isV3Chinese
                ? v3RoleForRuntimeId(role.id).difficulty
                : localize(role.roleDifficulty, language)}
              {' / '}
              {t('difficulty')}
            </p>
            <h2>
              {isV3Chinese
                ? v3RoleForRuntimeId(role.id).name
                : localize(role.name, language)}
            </h2>
            <p className="role-story">
              {isV3Chinese
                ? v3RoleForRuntimeId(role.id).roleCardText
                : englishRoleStory(role)}
            </p>
            {isV3Chinese && (
              <div className="role-tags">
                {v3RoleForRuntimeId(role.id).keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            )}
            {role.selectable ? (
              <button
                className="primary-button"
                onClick={() => selectRole(role.id)}
              >
                {t('selectRole')}
              </button>
            ) : (
              <span className="seat-status">{t('sessionSeat')}</span>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}
