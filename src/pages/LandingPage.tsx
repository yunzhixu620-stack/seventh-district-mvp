import { Link } from 'react-router-dom'
import { ui } from '../data/uiCopy'
import { linxiaEnvelope } from '../data/episode001_linxiaEnvelope'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function LandingPage() {
  const language = useGameStore((state) => state.language)
  const t = (key: keyof typeof ui) => localize(ui[key], language)

  return (
    <main className="landing">
      <div className="hero-copy">
        <p className="eyebrow">{t('landingTag')}</p>
        <h1>
          <span>{t('title')}</span>
          <small>{t('subtitle')}</small>
        </h1>
        <p className="hero-pitch">{t('premise')}</p>
        <Link className="primary-link" to="/roles">{t('start')}</Link>
      </div>
      <div className="incident-card" aria-label={localize(linxiaEnvelope.title, language)}>
        <div className="signal"><span /> SIGNAL LOST / 22:40</div>
        <div className="envelope">
          <div className="seal">07</div>
        </div>
        <p className="eyebrow">{t('incident')}</p>
        <p>{t('explore')}</p>
        <div className="incident-stats">
          <span>06 ROLE SLOTS</span>
          <span>04 TRUTHS</span>
          <span>01 ENVELOPE</span>
        </div>
      </div>
    </main>
  )
}
