import { describe, expect, it } from 'vitest'
import { parseAction } from './actionParser'
import { isCanonSafe } from './consistencyGuard'
import { buildReplayReport } from './replayEngine'
import { ruleAction } from './rulingEngine'
import { activateSession, createSession } from './sessionEngine'
import { selectTruthBySeed } from './seedEngine'

describe('episode truth selection', () => {
  it('selects a stable structured truth from a seed', () => {
    expect(selectTruthBySeed('D7-NIGHT').id).toBe(selectTruthBySeed('D7-NIGHT').id)
    const variants = new Set(['D7-NIGHT', 'D7-A', 'D7-B', 'D7-C', 'D7-D'].map((seed) => selectTruthBySeed(seed).id))
    expect(variants.size).toBeGreaterThanOrEqual(2)
  })
})

describe('action interpretation and ruling', () => {
  it('parses bilingual freeform intent into a rule-rulable action', () => {
    expect(parseAction('我要试探保管者关于封蜡的说法', 'freeText', undefined, 'keeper').type).toBe('probe')
    expect(parseAction('protect Zhao Jing now', 'freeText', undefined, 'protector').type).toBe('protect')
  })

  it('spends resources and only awards authored canon clues', () => {
    const active = activateSession(createSession('investigator', 'D7-NIGHT'))
    const action = parseAction('probe keeper', 'freeText', undefined, 'keeper')
    const result = ruleAction(active, action).nextState
    expect(result.composure).toBe(active.composure - 1)
    expect(result.knownClues).toHaveLength(1)
    expect(isCanonSafe(result)).toBe(true)
  })

  it('finishes with a matching protected outcome once evidence is gathered', () => {
    let session = activateSession(createSession('investigator', 'D7-NIGHT'))
    const truth = session.truth
    session = {
      ...session,
      knownClues: truth.clues.slice(0, 2),
      favor: 2,
    }
    const ending = ruleAction(
      session,
      parseAction(truth.idealFinalAction, 'recommended', truth.idealFinalAction, truth.idealTarget),
    ).nextState
    expect(ending.status).toBe('finished')
    expect(ending.result).toBe('success')
    expect(buildReplayReport(ending).truth.id).toBe(truth.id)
  })
})
