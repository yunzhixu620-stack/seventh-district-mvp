import type { ActionType, ParsedAction } from '../types/action'
import type { TruthVariant } from '../types/episode'
import type { StreetState } from '../types/world'

const clampMeter = (score: number): number => Math.max(0, Math.min(100, score))

const actionDeltas: Record<ActionType, StreetState> = {
  ask: {
    streetHeat: 7,
    adminAttention: 2,
    evidenceRisk: 3,
    publicOpinion: 4,
  },
  probe: {
    streetHeat: 10,
    adminAttention: 5,
    evidenceRisk: 9,
    publicOpinion: 5,
  },
  disguise: {
    streetHeat: 5,
    adminAttention: 7,
    evidenceRisk: 5,
    publicOpinion: 8,
  },
  trade: {
    streetHeat: 8,
    adminAttention: 3,
    evidenceRisk: 15,
    publicOpinion: 6,
  },
  follow: {
    streetHeat: 9,
    adminAttention: 5,
    evidenceRisk: 14,
    publicOpinion: 4,
  },
  reveal: {
    streetHeat: 20,
    adminAttention: 18,
    evidenceRisk: 16,
    publicOpinion: 22,
  },
  protect: {
    streetHeat: -5,
    adminAttention: 8,
    evidenceRisk: -12,
    publicOpinion: 5,
  },
}

export const createInitialStreetState = (truth: TruthVariant): StreetState => ({
  streetHeat: 12,
  adminAttention: 8 + truth.systemInterferenceLevel * 6,
  evidenceRisk: 14,
  publicOpinion: 10,
})

export const advanceStreetState = (
  streetState: StreetState,
  truth: TruthVariant,
  action: ParsedAction,
  cluesFound: number,
): { nextState: StreetState; delta: StreetState } => {
  const base = actionDeltas[action.type]
  const truthAttention =
    action.type === 'reveal' || action.type === 'disguise'
      ? truth.systemInterferenceLevel * 2
      : 0
  const holderPressure =
    action.targetId === truth.envelopeHolder && action.type !== 'protect'
      ? 6
      : 0
  const delta: StreetState = {
    streetHeat: base.streetHeat,
    adminAttention: base.adminAttention + truthAttention,
    evidenceRisk: base.evidenceRisk + cluesFound * 4 + holderPressure,
    publicOpinion: base.publicOpinion,
  }

  return {
    delta,
    nextState: {
      streetHeat: clampMeter(streetState.streetHeat + delta.streetHeat),
      adminAttention: clampMeter(
        streetState.adminAttention + delta.adminAttention,
      ),
      evidenceRisk: clampMeter(streetState.evidenceRisk + delta.evidenceRisk),
      publicOpinion: clampMeter(
        streetState.publicOpinion + delta.publicOpinion,
      ),
    },
  }
}

export const streetLevelIndex = (score: number): number =>
  Math.min(3, Math.floor(score / 25))
