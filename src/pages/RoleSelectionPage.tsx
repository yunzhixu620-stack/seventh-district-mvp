import { useNavigate } from 'react-router-dom'
import { selectableRoles } from '../data/roles'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function RoleSelectionPage() {
  const navigate = useNavigate()
  const { language, seed, setSeed, randomizeSeed, chooseRole } = useGameStore()
  const t = (key: keyof typeof ui) => localize(ui[key], language)

  const selectRole = (roleId: (typeof selectableRoles)[number]['id']) => {
    chooseRole(roleId)
    navigate('/briefing')
  }

  return (
    <main className="selection-page">
      <div className="page-intro">
        <p className="eyebrow">{t('incident')}</p>
        <h1>{t('rolesHeading')}</h1>
        <p>{t('rolesIntro')}</p>
        <label className="seed-control">
          <span>{t('seed')}</span>
          <input value={seed} onChange={(event) => setSeed(event.target.value)} />
          <button onClick={randomizeSeed}>{t('randomize')}</button>
        </label>
      </div>
      <div className="role-grid">
        {selectableRoles.map((role) => (
          <article className="role-option" key={role.id}>
            <p className="eyebrow">{localize(role.roleDifficulty, language)} / {t('difficulty')}</p>
            <h2>{localize(role.name, language)}</h2>
            <p className="role-public">{localize(role.publicIdentity, language)}</p>
            <p>{localize(role.roleFantasy, language)}</p>
            <div className="role-goal">
              <span>{t('objective')}</span>
              <p>{localize(role.personalGoal, language)}</p>
            </div>
            <button className="primary-button" onClick={() => selectRole(role.id)}>{t('selectRole')}</button>
          </article>
        ))}
      </div>
    </main>
  )
}
