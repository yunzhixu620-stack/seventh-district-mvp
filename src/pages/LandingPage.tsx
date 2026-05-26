import { Link } from 'react-router-dom'
import { ui } from '../data/uiCopy'
import { linxiaEnvelope } from '../data/episode001_linxiaEnvelope'
import { v3HomeCopy } from '../data/narrative/v3'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

export function LandingPage() {
  const language = useGameStore((state) => state.language)
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const isV3Chinese = language === 'zhCN'
  const title = isV3Chinese ? v3HomeCopy.title.body : t('title')
  const subtitle = isV3Chinese ? v3HomeCopy.subtitle.body : t('subtitle')
  const introduction = isV3Chinese ? v3HomeCopy.intro.body : t('premise')
  const sessionRule = isV3Chinese ? v3HomeCopy.footer.body : t('sessionRule')
  const enterLabel = isV3Chinese ? v3HomeCopy.enter.body : t('start')

  return (
    <main className="landing v2-landing v3-landing">
      <div className="hero-copy">
        <p className="eyebrow">{t('landingTag')}</p>
        <h1>
          <span>{title}</span>
          <small>{subtitle}</small>
        </h1>
        <p className="hero-pitch v3-intro">{introduction}</p>
        <p className="night-rule">{sessionRule}</p>
        <Link className="primary-link" to="/roles">
          {enterLabel}
        </Link>
      </div>
      <div
        className="incident-card cg-card"
        aria-label={localize(linxiaEnvelope.title, language)}
      >
        <div className="signal">
          <span /> SIGNAL LOST / 22:40
        </div>
        <img src={`${import.meta.env.BASE_URL}art/rain-kiosk.svg`} alt="" />
        <p className="eyebrow">{t('incident')}</p>
        <p>{t('explore')}</p>
        <div className="incident-stats">
          <span>{language === 'zhCN' ? '06 名参与者' : '06 PARTICIPANTS'}</span>
          <span>
            {language === 'zhCN' ? '04 种真相' : '04 SHIFTING TRUTHS'}
          </span>
          <span>{language === 'zhCN' ? '身份未知' : 'IDENTITIES HIDDEN'}</span>
        </div>
      </div>
    </main>
  )
}
