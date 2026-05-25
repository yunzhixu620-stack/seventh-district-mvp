import { useEffect } from 'react'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'
import { setAmbienceVolume, startAmbience, stopAmbience } from '../utils/audio'

export function PreferenceControls() {
  const { language, setLanguage, audioEnabled, setAudioEnabled, volume, setVolume, reducedMotion, setReducedMotion } =
    useGameStore()
  const t = (key: keyof typeof ui) => localize(ui[key], language)

  useEffect(() => {
    document.documentElement.lang = language === 'zhCN' ? 'zh-CN' : 'en'
    document.documentElement.dataset.reduceMotion = String(reducedMotion)
  }, [language, reducedMotion])

  useEffect(() => {
    if (audioEnabled) void startAmbience(1)
    else stopAmbience()
    return () => stopAmbience()
  }, [audioEnabled])

  useEffect(() => {
    if (audioEnabled) setAmbienceVolume(volume)
  }, [audioEnabled, volume])

  return (
    <div className="preference-controls" aria-label={t('language')}>
      <div className="language-switch" role="group" aria-label={t('language')}>
        <button className={language === 'zhCN' ? 'active' : ''} onClick={() => setLanguage('zhCN')}>中</button>
        <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
      </div>
      <button className="sound-toggle" onClick={() => setAudioEnabled(!audioEnabled)}>
        {audioEnabled ? t('soundOn') : t('soundOff')}
      </button>
      {audioEnabled && (
        <label className="volume">
          <span>{t('volume')}</span>
          <input aria-label={t('volume')} type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
        </label>
      )}
      <label className="motion-toggle">
        <input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} />
        <span>{t('motion')}</span>
      </label>
    </div>
  )
}
