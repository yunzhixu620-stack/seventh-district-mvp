import { describe, expect, it } from 'vitest'
import { parseAction } from './actionParser'
import { isCanonSafe } from './consistencyGuard'
import { buildReplayReport } from './replayEngine'
import { ruleAction } from './rulingEngine'
import { activateSession, createSession } from './sessionEngine'
import { selectTruthBySeed } from './seedEngine'

describe('episode truth selection', () => {
  it('selects a stable structured truth from a seed', () => {
    expect(selectTruthBySeed('D7-NIGHT').id).toBe(
      selectTruthBySeed('D7-NIGHT').id,
    )
    const variants = new Set(
      ['D7-NIGHT', 'D7-A', 'D7-B', 'D7-C', 'D7-D'].map(
        (seed) => selectTruthBySeed(seed).id,
      ),
    )
    expect(variants.size).toBeGreaterThanOrEqual(2)
  })
})

describe('action interpretation and ruling', () => {
  it('parses bilingual freeform intent into a rule-rulable action', () => {
    expect(
      parseAction(
        '我要试探保管者关于封蜡的说法',
        'freeText',
        undefined,
        'keeper',
      ).type,
    ).toBe('probe')
    expect(
      parseAction('protect Zhao Jing now', 'freeText', undefined, 'protector')
        .type,
    ).toBe('protect')
  })

  it('spends resources and only awards authored canon clues', () => {
    const active = activateSession(createSession('investigator', 'D7-NIGHT'))
    const action = parseAction('probe keeper', 'freeText', undefined, 'keeper')
    const result = ruleAction(active, action).nextState
    expect(result.composure).toBe(active.composure - 1)
    expect(result.knownClues).toHaveLength(1)
    expect(isCanonSafe(result)).toBe(true)
  })

  it('blocks immediate final protection or reveal until evidence comes from two people', () => {
    for (const roleId of ['investigator', 'keeper', 'seeker'] as const) {
      for (const finalAction of ['protect', 'reveal'] as const) {
        const active = activateSession(createSession(roleId, 'D7-NIGHT'))
        const ruling = ruleAction(
          active,
          parseAction(
            `${finalAction} now`,
            'freeText',
            finalAction,
            active.truth.idealTarget,
          ),
        )
        expect(ruling.actionAccepted).toBe(false)
        expect(ruling.nextState.status).toBe('active')
        expect(ruling.nextState.history).toHaveLength(0)
        expect(ruling.nextState.favor).toBe(active.favor)
      }
    }
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
      parseAction(
        truth.idealFinalAction,
        'recommended',
        truth.idealFinalAction,
        truth.idealTarget,
      ),
    ).nextState
    expect(ending.status).toBe('finished')
    expect(ending.result).toBe('success')
    expect(buildReplayReport(ending).truth.id).toBe(truth.id)
  })

  it('changes visible street state after at least four player action types', () => {
    for (const actionType of ['ask', 'probe', 'trade', 'follow'] as const) {
      const active = activateSession(createSession('investigator', 'D7-NIGHT'))
      const nextState = ruleAction(
        active,
        parseAction(actionType, 'recommended', actionType, 'keeper'),
      ).nextState

      expect(nextState.streetState).not.toEqual(active.streetState)
      expect(
        Object.values(nextState.lastEffect?.streetDelta ?? {}).some(
          (delta) => delta !== 0,
        ),
      ).toBe(true)
    }
  })

  it('lets three different non-player roles act visibly during one session', () => {
    let session = activateSession(createSession('investigator', 'D7-NIGHT'))
    const turns = [
      ['ask', 'keeper'],
      ['probe', 'seeker'],
      ['trade', 'leaker'],
    ] as const

    for (const [actionType, targetId] of turns) {
      session = ruleAction(
        session,
        parseAction(actionType, 'recommended', actionType, targetId),
      ).nextState
    }

    const activityMessages = session.messages.filter(
      (message) => message.activityKind,
    )

    expect(new Set(session.autonomousActorIds).size).toBeGreaterThanOrEqual(3)
    expect(activityMessages.length).toBeGreaterThanOrEqual(3)
    expect(
      activityMessages.some((message) => message.channel === 'private'),
    ).toBe(true)
  })
})
