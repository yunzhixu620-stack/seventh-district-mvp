import { npcProfiles } from '../data/npcs'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import type { RoleId } from '../types/role'
import { useGameStore } from '../store/gameStore'

export function LivePerformance({ targetId }: { targetId: RoleId }) {
  const { language, session, actorLoading } = useGameStore()
  if (!session) return null
  const performance = session.latestPerformance
  const effect = session.lastEffect

  return (
    <section className="performance-box" aria-live="polite">
      <header>
        <strong>{localize(npcProfiles[targetId].callSign, language)}</strong>
        <span className={performance?.mode === 'live' ? 'live' : ''}>
          {actorLoading
            ? localize(ui.aiThinking, language)
            : performance?.mode === 'live'
              ? localize(ui.aiLive, language)
              : localize(ui.aiReady, language)}
        </span>
      </header>
      {actorLoading ? (
        <p className="typing">{localize(ui.aiThinkingDetail, language)}</p>
      ) : performance ? (
        <>
          <p className="spoken">“{performance.line}”</p>
          <p className="gesture">{performance.gesture}</p>
          <footer>
            <span>{localize(ui.subtext, language)}: {performance.subtext}</span>
            <small>{performance.model}</small>
          </footer>
        </>
      ) : (
        <p className="spoken">{localize(ui.chooseVoice, language)}</p>
      )}
      {effect && !actorLoading && (
        <div className="effect-strip">
          <b>{localize(ui.consequence, language)}</b>
          {effect.riskDelta !== 0 && (
            <span className={effect.riskDelta > 0 ? 'risk-up' : 'risk-down'}>
              {localize(effect.riskDelta > 0 ? ui.riskRise : ui.riskEase, language)} {effect.riskDelta > 0 ? '+' : ''}{effect.riskDelta}
            </span>
          )}
          {effect.spentComposure > 0 && <span>{localize(ui.spentComposure, language)} -{effect.spentComposure}</span>}
          {effect.spentFavor > 0 && <span>{localize(ui.spentFavor, language)} -{effect.spentFavor}</span>}
          {effect.addedClueIds.length > 0 && <span className="evidence-change">{localize(ui.newEvidence, language)} +{effect.addedClueIds.length}</span>}
        </div>
      )}
    </section>
  )
}
