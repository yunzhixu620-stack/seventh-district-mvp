import { useState, type FormEvent } from 'react'
import { actionOrder, actions } from '../data/actions'
import { npcProfiles } from '../data/npcs'
import { roleById } from '../data/roles'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import type { RoleId } from '../types/role'
import { useGameStore } from '../store/gameStore'
import { playCue } from '../utils/audio'

export function ActionDesk({ onFinished }: { onFinished: () => void }) {
  const [input, setInput] = useState('')
  const {
    language, session, selectedTargetId, setTarget, pendingAction, previewRecommended, previewText,
    cancelPreview, commitAction, audioEnabled, volume,
  } = useGameStore()
  if (!session) return null
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const targets = Object.keys(roleById).filter((id) => id !== session.roleId) as RoleId[]

  const submitText = (event: FormEvent) => {
    event.preventDefault()
    if (input.trim()) previewText(input)
  }

  const commit = () => {
    const previousClues = session.knownClues.length
    const previousRisk = session.risk
    const nextState = commitAction()
    if (!nextState || !audioEnabled) {
      if (nextState?.status === 'finished') onFinished()
      return
    }
    if (nextState.status === 'finished') {
      playCue('conclusion', volume)
      onFinished()
    } else if (nextState.knownClues.length > previousClues) playCue('clue', volume)
    else if (nextState.risk > previousRisk + 10) playCue('warning', volume)
    else playCue('round', volume)
  }

  return (
    <section className="panel action-desk" aria-label={t('actions')}>
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('round')} {session.round}</p>
          <h2>{t('actions')}</h2>
        </div>
        <label className="target-select">
          <span>{t('chooseTarget')}</span>
          <select value={selectedTargetId} onChange={(event) => setTarget(event.target.value as RoleId)}>
            {targets.map((id) => (
              <option key={id} value={id}>
                {localize(npcProfiles[id].callSign, language)} / {localize(roleById[id].name, language)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="recommendations">
        {actionOrder.map((type) => (
          <button key={type} className={actions[type].terminal ? 'terminal-action' : ''} onClick={() => previewRecommended(type)}>
            <span>{localize(actions[type].label, language)}</span>
            <small>{localize(actions[type].description, language)}</small>
          </button>
        ))}
      </div>
      <form className="freeform" onSubmit={submitText}>
        <label htmlFor="intent">{t('freeform')}</label>
        <div>
          <input id="intent" value={input} placeholder={t('placeholder')} onChange={(event) => setInput(event.target.value)} />
          <button type="submit">{t('interpret')}</button>
        </div>
      </form>
      {pendingAction && (
        <div className="preview-card" role="dialog" aria-label={t('preview')}>
          <p className="eyebrow">{t('preview')} / {pendingAction.confidence}</p>
          <strong>{localize(actions[pendingAction.type].label, language)} → {localize(npcProfiles[selectedTargetId].callSign, language)}</strong>
          <p>{localize(pendingAction.warning, language)}</p>
          <div>
            <button className="confirm" onClick={commit}>{t('confirm')}</button>
            <button onClick={cancelPreview}>{t('cancel')}</button>
          </div>
        </div>
      )}
    </section>
  )
}
