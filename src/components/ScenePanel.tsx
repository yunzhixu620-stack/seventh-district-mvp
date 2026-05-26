import { locations } from '../data/locations'
import { ui } from '../data/uiCopy'
import { linxiaEnvelope } from '../data/episode001_linxiaEnvelope'
import { linxiaEnvelopeOpening } from '../data/narrative/v3'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import { PixelPortrait } from './PixelPortrait'
import { LivePerformance } from './LivePerformance'
import type { RoleId } from '../types/role'
import { roleById } from '../data/roles'

export function ScenePanel() {
  const { session, language, setLocation, selectedTargetId, setTarget } = useGameStore()
  if (!session) return null
  const visibleRoles = Object.keys(roleById).filter((roleId) => roleId !== session.roleId) as RoleId[]
  const sceneAsset = {
    kiosk: 'rain-kiosk.svg',
    arcade: 'arcade.svg',
    footbridge: 'footbridge.svg',
  }[session.locationId]
  return (
    <section className="vn-stage" aria-label={localize(ui.locations, language)}>
      <div className="scene-screen">
        <img src={`${import.meta.env.BASE_URL}art/${sceneAsset}`} alt="" />
        <div className="scene-caption">
          <p className="eyebrow">{localize(locations[session.locationId].name, language)}</p>
          <p>{localize(locations[session.locationId].atmosphere, language)}</p>
        </div>
        <div className="stage-cast" aria-label={localize(ui.castTitle, language)}>
          {visibleRoles.map((roleId) => (
            <PixelPortrait
              key={roleId}
              roleId={roleId}
              language={language}
              active={selectedTargetId === roleId}
              onClick={() => setTarget(roleId)}
            />
          ))}
        </div>
      </div>
      <LivePerformance targetId={selectedTargetId} />
      <div className="scene-footer">
        {language === 'zhCN' ? (
          <details className="v3-opening">
            <summary>开场简报：林夏不见了，展开查看前情</summary>
            <p>{linxiaEnvelopeOpening.body}</p>
          </details>
        ) : (
          <p>{localize(linxiaEnvelope.premise, language)}</p>
        )}
        <nav className="scene-choices">
          {linxiaEnvelope.locations.map((locationId) => (
            <button
              key={locationId}
              className={session.locationId === locationId ? 'active' : ''}
              onClick={() => setLocation(locationId)}
            >
              {localize(locations[locationId].name, language)}
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}
