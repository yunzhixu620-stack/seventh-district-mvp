import { Navigate, useNavigate } from 'react-router-dom'
import { v3RoleForRuntimeId } from '../data/narrative/v3'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function BriefingPage() {
  const navigate = useNavigate()
  const { language, session, beginIncident } = useGameStore()
  if (!session) return <Navigate to="/roles" replace />
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const v3Role = v3RoleForRuntimeId(session.roleId)
  const isV3Chinese = language === 'zhCN'

  const begin = () => {
    beginIncident()
    navigate('/board')
  }

  return (
    <main className="briefing-page">
      <section className="briefing-card">
        <p className="eyebrow">
          {t('briefing')} / {session.seed}
        </p>
        <h1>
          {isV3Chinese ? v3Role.name : localize(session.role.name, language)}
        </h1>
        {isV3Chinese ? (
          <>
            <p className="briefing-narrative">{v3Role.briefingText}</p>
            <div className="briefing-goal">
              <p className="eyebrow">{t('objective')}</p>
              <p>{v3Role.personalGoalText}</p>
            </div>
            <p className="briefing-risk">{v3Role.failureRiskText}</p>
          </>
        ) : (
          <dl>
            <div>
              <dt>{t('publicFace')}</dt>
              <dd>{localize(session.role.publicIdentity, language)}</dd>
            </div>
            <div>
              <dt>{t('hidden')}</dt>
              <dd>{localize(session.role.hiddenIdentity, language)}</dd>
            </div>
            <div>
              <dt>{t('objective')}</dt>
              <dd>{localize(session.role.personalGoal, language)}</dd>
            </div>
            <div>
              <dt>{t('knowledge')}</dt>
              <dd>{localize(session.role.privateKnowledge[0], language)}</dd>
            </div>
          </dl>
        )}
        <div className="brief-resources">
          <span>
            {t('composure')} <strong>{session.composure}</strong>
          </span>
          <span>
            {t('favors')} <strong>{session.favor}</strong>
          </span>
        </div>
        <button className="primary-button" onClick={begin}>
          {t('enter')}
        </button>
      </section>
    </main>
  )
}
