import { describe, expect, it } from 'vitest'
import { v3AutonomousActions } from './autonomousActions'
import { linxiaEnvelopeFixedRules, v3TruthVariants } from './episode001'
import { v3PostGameIntro, v3RevealFields } from './postGameReveal'
import { v3Roles } from './roles'
import { v3NarrativeSource } from './source'
import { v3StreetStateCopy } from './streetStateCopy'

const protectorGoalTest =
  'prevents the protector fantasy from ending at merely hiding the envelope'
const autonomousRolesTest =
  'supports autonomous action material for at least three participants'
const hiddenControlTypeTest =
  'preserves hidden control types in play and exposes them after the game'
const streetMeterTest =
  'has inspectable copy contracts for all required street-state meters'

describe('V3 narrative source boundary', () => {
  it('marks the owner narrative bible as the source of truth', () => {
    expect(v3NarrativeSource.ownerProvided).toBe(true)
    expect(v3NarrativeSource.sourceOfTruth).toBe(true)
    expect(v3NarrativeSource.documentPath).toBe(
      'docs/02_narrative/v3_narrative_bible.md',
    )
  })

  it('keeps four variable truths for the contested envelope', () => {
    expect(v3TruthVariants.map((variant) => variant.id)).toEqual([
      'misunderstanding',
      'protection',
      'trade',
      'systemInterference',
    ])
    expect(
      new Set(v3TruthVariants.map((variant) => variant.trueThreat)).size,
    ).toBe(4)
  })
})

describe('V3 non-negotiable content gates', () => {
  it(protectorGoalTest, () => {
    const protector = v3Roles.find((role) => role.id === 'linxiaProtector')

    expect(protector?.personalGoalText).toContain('保护林夏不被错误的人定位')
    expect(protector?.personalGoalText).toContain(
      '确保信封或其内容没有被完全销毁',
    )
  })

  it(autonomousRolesTest, () => {
    const actorCount = new Set(v3AutonomousActions.map((entry) => entry.actor))
      .size

    expect(actorCount).toBeGreaterThanOrEqual(3)
  })

  it(hiddenControlTypeTest, () => {
    expect(linxiaEnvelopeFixedRules).toContain(
      '玩家无法在局内确认哪些角色是 AI。',
    )
    expect(v3PostGameIntro.body).toContain('局内不会告诉你谁是真人')
    expect(v3RevealFields).toContain('本局控制类型')
    expect(v3RevealFields).toContain('你是否误判')
  })

  it(streetMeterTest, () => {
    expect(v3StreetStateCopy.map((meter) => meter.id)).toEqual([
      'streetHeat',
      'adminAttention',
      'evidenceRisk',
      'publicOpinion',
    ])
    expect(v3StreetStateCopy.every((meter) => meter.levels.length >= 4)).toBe(
      true,
    )
  })
})
