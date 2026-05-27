import { Navigate, useNavigate } from 'react-router-dom'
import { v3ControlTypeCopy } from '../data/narrative/v3'
import { buildReplayReport } from '../engine/replayEngine'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import type { IdentityGuess } from '../types/world'

const guessLabelByType: Record<IdentityGuess, keyof typeof ui> = {
  humanSlot: 'guessHumanSlot',
  aiAgent: 'guessAiAgent',
  fixedNpc: 'guessFixedNpc',
  systemProxy: 'guessSystemProxy',
  uncertain: 'guessUncertain',
}

const resultLabelByType = {
  correct: 'identityCorrect',
  incorrect: 'identityIncorrect',
  uncertain: 'identityUncertain',
} as const

export function ReportPage() {
  const navigate = useNavigate()
  const { session, language, resetRun } = useGameStore()
  if (!session || session.status !== 'finished')
    return <Navigate to="/roles" replace />
  if (!session.identityGuessSubmitted)
    return <Navigate to="/identity-guess" replace />
  const report = buildReplayReport(session)
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const rulingLabel =
    report.result === 'success'
      ? t('rulingSuccess')
      : report.result === 'partial'
        ? t('rulingPartial')
        : t('rulingFailure')

  const replay = () => {
    resetRun()
    navigate('/roles')
  }

  return (
    <main className="report-page">
      <section className={`report-hero result-${report.result}`}>
        <p className="eyebrow">
          {t('report')} / {session.seed}
        </p>
        <h1>{report.v3Reveal.heading}</h1>
        <p className="reveal-intro">{report.v3Reveal.intro}</p>
        <div className="outcome-stamp">
          <small>{t('rulingResult')}</small>
          <strong>{rulingLabel}</strong>
          <p>{localize(report.outcome, language)}</p>
        </div>
      </section>
      <div className="report-grid">
        <section className="panel">
          <p className="eyebrow">{t('truthVariant')}</p>
          <h2>{report.v3Reveal.truth.name}</h2>
          <h3>{t('meaning')}</h3>
          <p>{report.v3Reveal.truth.envelopeMeaning}</p>
          <h3>{t('threat')}</h3>
          <p>{report.v3Reveal.truth.trueThreat}</p>
        </section>
        <section className="panel ending-panel">
          <p className="eyebrow">{t('resolution')}</p>
          <h2>{report.v3Reveal.ending.name}</h2>
          <p>{report.v3Reveal.ending.body}</p>
        </section>
      </div>
      <section className="panel reveal-panel">
        <p className="eyebrow">{t('roleReveal')}</p>
        <div className="reveal-roster">
          {report.v3Reveal.roles.map((role) => (
            <article className="reveal-card" key={role.roleId}>
              <header>
                <div>
                  <strong>{localize(role.actorName, language)}</strong>
                  <span>{role.roleName}</span>
                </div>
                <div className="reveal-flags">
                  <b className={role.achieved ? 'achieved' : 'failed'}>
                    {role.achieved ? t('achieved') : t('failed')}
                  </b>
                  {role.misledPlayer && (
                    <b className="misleading">{t('misleadingRole')}</b>
                  )}
                </div>
              </header>
              <h3>{t('controlType')}</h3>
              <p className="control-type">
                {role.controlType === 'player'
                  ? t('playerControlled')
                  : v3ControlTypeCopy[role.controlType]}
              </p>
              <h3>{t('trueGoal')}</h3>
              <p>{role.goal}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="report-grid report-details">
        <section className="panel">
          <p className="eyebrow">{t('misdirection')}</p>
          {report.v3Reveal.misdirectionSources.length === 0 ? (
            <p>{t('noMisdirection')}</p>
          ) : (
            <div className="misdirection-list">
              {report.v3Reveal.misdirectionSources.map((source) => (
                <article key={localize(source.actorName, language)}>
                  <strong>{localize(source.actorName, language)}</strong>
                  <p>{localize(source.evidence, language)}</p>
                </article>
              ))}
            </div>
          )}
          <h3>{t('identityJudgment')}</h3>
          {report.v3Reveal.identityJudgmentRecorded ? (
            <>
              <p className="identity-summary">
                {t('identityCorrect')}: {report.v3Reveal.identitySummary.correct}{' '}
                / {t('identityIncorrect')}:{' '}
                {report.v3Reveal.identitySummary.incorrect} /{' '}
                {t('identityUncertain')}:{' '}
                {report.v3Reveal.identitySummary.uncertain}
              </p>
              <div className="identity-results">
                {report.v3Reveal.roles
                  .filter((role) => role.guessResult && role.guess)
                  .map((role) => (
                    <article key={role.roleId}>
                      <header>
                        <strong>{localize(role.actorName, language)}</strong>
                        <b className={role.guessResult}>
                          {t(resultLabelByType[role.guessResult!])}
                        </b>
                      </header>
                      <p>
                        {t('identityYourGuess')}:{' '}
                        {t(guessLabelByType[role.guess!])}
                      </p>
                      <p>
                        {t('controlType')}:{' '}
                        {role.controlType === 'player'
                          ? t('playerControlled')
                          : v3ControlTypeCopy[role.controlType]}
                      </p>
                      {role.guessResult === 'incorrect' && (
                        <small>
                          {t(
                            role.misledPlayer
                              ? 'identityMisledReason'
                              : 'identityNoObservedMisdirection',
                          )}
                        </small>
                      )}
                    </article>
                  ))}
              </div>
            </>
          ) : (
            <p>
              {report.v3Reveal.identityGuessSkipped
                ? t('identitySkipped')
                : t('identityNotRecorded')}
            </p>
          )}
        </section>
        <section className="panel">
          <p className="eyebrow">{t('actionTrail')}</p>
          <ol className="action-trail">
            {report.actionSummary.map((summary, index) => (
              <li key={index}>{localize(summary, language)}</li>
            ))}
          </ol>
          <p className="eyebrow">{t('missed')}</p>
          <div className="missed-list">
            {report.missedClues.map((clue) => (
              <span key={clue.id}>{localize(clue.title, language)}</span>
            ))}
          </div>
        </section>
      </div>
      <p className="replay-note">{localize(report.replayPrompt, language)}</p>
      <button className="primary-button replay-button" onClick={replay}>
        {t('replay')}
      </button>
    </main>
  )
}
