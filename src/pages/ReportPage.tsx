import { Navigate, useNavigate } from 'react-router-dom'
import { buildReplayReport } from '../engine/replayEngine'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function ReportPage() {
  const navigate = useNavigate()
  const { session, language, resetRun } = useGameStore()
  if (!session || session.status !== 'finished') return <Navigate to="/" replace />
  const report = buildReplayReport(session)
  const t = (key: keyof typeof ui) => localize(ui[key], language)

  const replay = () => {
    resetRun()
    navigate('/roles')
  }

  return (
    <main className="report-page">
      <section className={`report-hero result-${report.result}`}>
        <p className="eyebrow">{t('report')} / {session.seed}</p>
        <h1>{localize(report.heading, language)}</h1>
        <p>{localize(report.outcome, language)}</p>
      </section>
      <div className="report-grid">
        <section className="panel">
          <p className="eyebrow">{t('truthVariant')}</p>
          <h2>{localize(report.truth.name, language)}</h2>
          <h3>{t('meaning')}</h3>
          <p>{localize(report.truth.envelopeMeaning, language)}</p>
          <h3>{t('threat')}</h3>
          <p>{localize(report.truth.trueThreat, language)}</p>
          <h3>{t('roleOutcome')}</h3>
          <p>{localize(report.roleOutcome, language)}</p>
        </section>
        <section className="panel">
          <p className="eyebrow">{t('actionTrail')}</p>
          <ol className="action-trail">
            {report.actionSummary.map((summary, index) => <li key={index}>{localize(summary, language)}</li>)}
          </ol>
          <p className="eyebrow">{t('missed')}</p>
          <div className="missed-list">
            {report.missedClues.map((clue) => <span key={clue.id}>{localize(clue.title, language)}</span>)}
          </div>
        </section>
      </div>
      <p className="replay-note">{localize(report.replayPrompt, language)}</p>
      <button className="primary-button replay-button" onClick={replay}>{t('replay')}</button>
    </main>
  )
}
