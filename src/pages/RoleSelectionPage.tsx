import { useNavigate } from 'react-router-dom'
import { roles, selectableRoles } from '../data/roles'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import { PixelPortrait } from '../components/PixelPortrait'

export function RoleSelectionPage() {
  const navigate = useNavigate()
  const { language, seed, setSeed, randomizeSeed, chooseRole } = useGameStore()
  const t = (key: keyof typeof ui) => localize(ui[key], language)

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
          <input value={seed} onChange={(event) => setSeed(event.target.value)} />
          <button onClick={randomizeSeed}>{t('randomize')}</button>
        </label>
      </div>
      <section className="cast-roster">
        {roles.map((role) => (
          <article key={role.id} className={role.selectable ? 'inhabitable' : ''}>
            <PixelPortrait roleId={role.id} language={language} />
            <p>{localize(role.publicIdentity, language)}</p>
            <span>{role.selectable ? t('playerReady') : t('aiControlled')}</span>
          </article>
        ))}
      </section>
      <div className="selection-heading">
        <h2>{t('rolesHeading')}</h2>
        <p>{t('rolesIntro')}</p>
      </div>
      <div className="role-grid">
        {selectableRoles.map((role) => (
          <article className="role-option" key={role.id}>
            <PixelPortrait roleId={role.id} language={language} />
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
