import { useState, type FormEvent } from 'react'
import { actionOrder, actions } from '../data/actions'
import { v3RoleForRuntimeId } from '../data/narrative/v3'
import { npcProfiles } from '../data/npcs'
import { roleById } from '../data/roles'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import type { ActionType } from '../types/action'
import type { RoleId } from '../types/role'
import { useGameStore } from '../store/gameStore'
import { playCue } from '../utils/audio'
import { evaluateFinaleGate, REQUIRED_FINALE_CLUES } from '../engine/finaleGate'

export function ActionDesk({ onFinished }: { onFinished: () => void }) {
  const [input, setInput] = useState('')
  const {
    language,
    session,
    selectedTargetId,
    setTarget,
    pendingAction,
    previewRecommended,
    previewText,
    cancelPreview,
    commitAction,
    audioEnabled,
    volume,
  } = useGameStore()
  if (!session) return null
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const targets = Object.keys(roleById).filter(
    (id) => id !== session.roleId,
  ) as RoleId[]
  const finaleGate = evaluateFinaleGate(session)
  const finalPreviewLocked = Boolean(
    pendingAction && actions[pendingAction.type].terminal && !finaleGate.ready,
  )
  const showFirstSessionGuide = session.history.length < 2
  const suggestedAction: ActionType =
    session.knownClues.length === 0 ? 'ask' : 'probe'
  const actionClassName = (type: (typeof actionOrder)[number]) =>
    [
      actions[type].terminal && 'terminal-action',
      actions[type].terminal && !finaleGate.ready && 'locked-action',
    ]
      .filter(Boolean)
      .join(' ')

  const submitText = (event: FormEvent) => {
    event.preventDefault()
    if (input.trim()) previewText(input)
  }

  const commit = async () => {
    const previousClues = session.knownClues.length
    const previousRisk = session.risk
    const nextState = await commitAction()
    if (!nextState || !audioEnabled) {
      if (nextState?.status === 'finished') onFinished()
      return
    }
    if (nextState.status === 'finished') {
      playCue('conclusion', volume)
      onFinished()
    } else if (nextState.knownClues.length > previousClues)
      playCue('clue', volume)
    else if (nextState.risk > previousRisk + 10) playCue('warning', volume)
    else playCue('round', volume)
  }

  return (
    <section className="dialogue-controls" aria-label={t('actions')}>
      <div className="section-head">
        <div>
          <p className="eyebrow">
            {t('round')} {session.round}
          </p>
          <h2>{t('actions')}</h2>
        </div>
        <label className="target-select screen-reader-fallback">
          <span>{t('chooseTarget')}</span>
          <select
            value={selectedTargetId}
            onChange={(event) => setTarget(event.target.value as RoleId)}
          >
            {targets.map((id) => (
              <option key={id} value={id}>
                {localize(npcProfiles[id].callSign, language)} /{' '}
                {language === 'zhCN'
                  ? v3RoleForRuntimeId(id).name
                  : localize(roleById[id].name, language)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="recommendations">
        {actionOrder.map((type) => (
          <button
            key={type}
            className={actionClassName(type)}
            onClick={() => previewRecommended(type)}
            disabled={actions[type].terminal && !finaleGate.ready}
          >
            <span>{localize(actions[type].label, language)}</span>
            <small>{localize(actions[type].description, language)}</small>
          </button>
        ))}
      </div>
      {showFirstSessionGuide && (
        <aside className="session-guide" aria-label={t('sessionGuide')}>
          <p className="eyebrow">{t('sessionGuide')}</p>
          <strong>
            {t('recommendedNextAction')}: {localize(actions[suggestedAction].label, language)}{' '}
            → {localize(npcProfiles[selectedTargetId].callSign, language)}
          </strong>
          <p>
            {t(
              session.knownClues.length === 0
                ? 'firstQuestionReason'
                : 'followupReason',
            )}
          </p>
          <button
            className="guide-action"
            onClick={() => previewRecommended(suggestedAction)}
          >
            {t('trySuggestedAction')}
          </button>
        </aside>
      )}
      <div
        className={`finale-gate ${finaleGate.ready ? 'ready' : ''}`}
        aria-live="polite"
      >
        <strong>{t(finaleGate.ready ? 'finaleReady' : 'finaleLocked')}</strong>
        <span>
          {t('evidenceProgress')}{' '}
          {Math.min(finaleGate.sourceCount, REQUIRED_FINALE_CLUES)}/
          {REQUIRED_FINALE_CLUES} ·{' '}
          {t(finaleGate.ready ? 'finaleSatisfied' : 'finaleRequirement')}
        </span>
        <small>
          {t('finaleTarget')}
          {localize(npcProfiles[selectedTargetId].callSign, language)}
        </small>
      </div>
      <form className="freeform" onSubmit={submitText}>
        <label htmlFor="intent">{t('freeform')}</label>
        <div>
          <input
            id="intent"
            value={input}
            placeholder={t('placeholder')}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
          />
          <button type="submit">{t('interpret')}</button>
        </div>
      </form>
      {pendingAction && (
        <div className="preview-card" role="dialog" aria-label={t('preview')}>
          <p className="eyebrow">
            {t('preview')} / {pendingAction.confidence}
          </p>
          <strong>
            {localize(actions[pendingAction.type].label, language)} →{' '}
            {localize(npcProfiles[selectedTargetId].callSign, language)}
          </strong>
          <p>
            {finalPreviewLocked
              ? t('finalBlockedPreview')
              : localize(pendingAction.warning, language)}
          </p>
          <div>
            <button
              className="confirm"
              onClick={commit}
              disabled={finalPreviewLocked}
            >
              {t('confirm')}
            </button>
            <button onClick={cancelPreview}>{t('cancel')}</button>
          </div>
        </div>
      )}
    </section>
  )
}
