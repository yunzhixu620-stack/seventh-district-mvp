import { useState } from 'react'
import { npcProfiles } from '../data/npcs'
import { ui } from '../data/uiCopy'
import { localize } from '../types/i18n'
import { useGameStore } from '../store/gameStore'

type Tab = 'public' | 'private' | 'clues'

export function IntelBoard() {
  const [tab, setTab] = useState<Tab>('public')
  const { session, language } = useGameStore()
  if (!session) return null
  const t = (key: keyof typeof ui) => localize(ui[key], language)
  const messages = session.messages.filter((message) =>
    tab === 'public'
      ? message.channel !== 'private'
      : message.channel === 'private',
  )

  return (
    <aside className="panel intel-board" aria-label={t('intel')}>
      <h2>{t('intel')}</h2>
      <div className="tabs" role="tablist">
        {(['public', 'private', 'clues'] as Tab[]).map((item) => (
          <button
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? 'active' : ''}
            key={item}
            onClick={() => setTab(item)}
          >
            {t(item)}
            {item === 'clues' && (
              <small className={session.knownClues.length ? 'has-clue' : ''}>
                {session.knownClues.length
                  ? `${t('newEvidence')} ${session.knownClues.length}`
                  : '0'}
              </small>
            )}
          </button>
        ))}
      </div>
      {tab === 'clues' ? (
        <div className="clue-list">
          {session.knownClues.length === 0 && (
            <p className="empty">{t('emptyClue')}</p>
          )}
          {session.knownClues.map((clue) => (
            <article key={clue.id} className="fresh-clue">
              <span className="evidence-tag">{t('newEvidence')}</span>
              <h3>{localize(clue.title, language)}</h3>
              <p>{localize(clue.detail, language)}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="message-list">
          {messages.map((message) => (
            <article key={message.id}>
              <header>
                <strong>
                  {message.displaySender
                    ? localize(message.displaySender, language)
                    : message.sender === 'district'
                      ? t('incident')
                      : localize(
                          npcProfiles[message.sender].callSign,
                          language,
                        )}
                </strong>
                <time>
                  {String(22 + Math.floor(message.round / 4)).padStart(2, '0')}:
                  {String(40 + message.round * 2).padStart(2, '0')}
                </time>
              </header>
              {message.activityKind && (
                <span className={`activity-tag ${message.activityKind}`}>
                  {t(message.activityKind)}
                </span>
              )}
              <p>{localize(message.text, language)}</p>
            </article>
          ))}
        </div>
      )}
    </aside>
  )
}
