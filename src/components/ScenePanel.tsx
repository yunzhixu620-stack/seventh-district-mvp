import { locations } from '../data/locations'
import { ui } from '../data/uiCopy'
import { linxiaEnvelope } from '../data/episode001_linxiaEnvelope'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function ScenePanel() {
  const { session, language, setLocation } = useGameStore()
  if (!session) return null
  return (
    <section className="panel scene-panel" aria-label={localize(ui.locations, language)}>
      <div>
        <p className="eyebrow">{localize(ui.currentSituation, language)}</p>
        <p className="incident-line">{localize(linxiaEnvelope.premise, language)}</p>
      </div>
      <div className="scene-choices">
        {linxiaEnvelope.locations.map((locationId) => (
          <button
            key={locationId}
            className={session.locationId === locationId ? 'active' : ''}
            onClick={() => setLocation(locationId)}
          >
            {localize(locations[locationId].name, language)}
          </button>
        ))}
      </div>
    </section>
  )
}
