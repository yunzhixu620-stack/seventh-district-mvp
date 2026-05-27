import { locations } from '../data/locations'
import { v3RoleForRuntimeId, v3StreetStateCopy } from '../data/narrative/v3'
import { ui } from '../data/uiCopy'
import { streetLevelIndex } from '../engine/streetStateEngine'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function StatusCard() {
  const { session, language } = useGameStore()
  if (!session) return null
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const exposureClass =
    session.risk >= 60 ? 'danger' : session.risk >= 35 ? 'alert' : 'safe'
  const v3Role = v3RoleForRuntimeId(session.roleId)
  const isV3Chinese = language === 'zhCN'

  return (
    <aside className="status-column">
      <div className="panel role-panel">
        <p className="eyebrow">
          {isV3Chinese ? v3Role.name : localize(session.role.name, language)}
        </p>
        <h2>
          {isV3Chinese
            ? v3Role.keywords.join(' / ')
            : localize(session.role.publicIdentity, language)}
        </h2>
        <p className="objective-label">{t('objective')}</p>
        <p>
          {isV3Chinese
            ? v3Role.personalGoalText
            : localize(session.role.personalGoal, language)}
        </p>
      </div>
      <div className="panel resources">
        <div>
          <strong>{session.composure}</strong>
          <span>{t('composure')}</span>
        </div>
        <div>
          <strong>{session.favor}</strong>
          <span>{t('favors')}</span>
        </div>
        <div className={exposureClass}>
          <strong>{session.risk}%</strong>
          <span>{t('exposure')}</span>
        </div>
      </div>
      <div className="panel street-state-panel">
        <p className="eyebrow">{t('streetState')}</p>
        {v3StreetStateCopy.map((meter) => {
          const value = session.streetState[meter.id]
          const level = meter.levels[streetLevelIndex(value)]

          return (
            <details
              className="street-meter"
              data-testid={`street-meter-${meter.id}`}
              data-value={value}
              key={meter.id}
            >
              <summary>
                <span>{meter.name}</span>
                <strong>{level.label}</strong>
                <small>{value}</small>
              </summary>
              <div className="meter-track">
                <i style={{ width: `${value}%` }} />
              </div>
              <p>{level.body}</p>
            </details>
          )
        })}
        {session.streetState.publicOpinion < 25 && (
          <p className="public-opinion-empty">{t('publicOpinionQuiet')}</p>
        )}
      </div>
      <div className="panel location-panel">
        <p className="eyebrow">{t('currentSituation')}</p>
        <h3>{localize(locations[session.locationId].name, language)}</h3>
        <p>{localize(locations[session.locationId].atmosphere, language)}</p>
      </div>
    </aside>
  )
}
