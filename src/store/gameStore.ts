import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { parseAction } from '../engine/actionParser'
import { ruleAction } from '../engine/rulingEngine'
import { activateSession, createSession } from '../engine/sessionEngine'
import { createRandomSeed } from '../engine/seedEngine'
import { locations } from '../data/locations'
import { npcProfiles } from '../data/npcs'
import { roleById } from '../data/roles'
import { requestActorPerformance } from '../providers/liveActorProvider'
import type { ActionType, ParsedAction } from '../types/action'
import type { Language } from '../types/i18n'
import type { RoleId } from '../types/role'
import type { SessionState } from '../types/world'

type Preferences = {
  language: Language
  audioEnabled: boolean
  volume: number
  reducedMotion: boolean
}

type GameStore = Preferences & {
  seed: string
  selectedRoleId?: RoleId
  selectedTargetId: RoleId
  session?: SessionState
  pendingAction?: ParsedAction
  actorLoading: boolean
  setLanguage: (language: Language) => void
  setAudioEnabled: (enabled: boolean) => void
  setVolume: (volume: number) => void
  setReducedMotion: (reduced: boolean) => void
  setSeed: (seed: string) => void
  randomizeSeed: () => void
  chooseRole: (roleId: RoleId) => void
  beginIncident: () => void
  setTarget: (roleId: RoleId) => void
  setLocation: (locationId: string) => void
  previewRecommended: (action: ActionType) => void
  previewText: (input: string) => void
  cancelPreview: () => void
  commitAction: () => Promise<SessionState | undefined>
  resetRun: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      language: 'zhCN',
      audioEnabled: false,
      volume: 0.55,
      reducedMotion: false,
      seed: 'D7-NIGHT',
      selectedTargetId: 'keeper',
      actorLoading: false,
      setLanguage: (language) => set({ language }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setVolume: (volume) => set({ volume }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setSeed: (seed) => set({ seed: seed.trim() || 'D7-NIGHT' }),
      randomizeSeed: () => set({ seed: createRandomSeed() }),
      chooseRole: (selectedRoleId) =>
        set((state) => ({
          selectedRoleId,
          session: createSession(selectedRoleId, state.seed),
          pendingAction: undefined,
          actorLoading: false,
        })),
      beginIncident: () => set((state) => (state.session ? { session: activateSession(state.session) } : state)),
      setTarget: (selectedTargetId) => set({ selectedTargetId }),
      setLocation: (locationId) =>
        set((state) => (state.session ? { session: { ...state.session, locationId } } : state)),
      previewRecommended: (action) =>
        set((state) => ({
          pendingAction: parseAction(action, 'recommended', action, state.selectedTargetId),
        })),
      previewText: (input) =>
        set((state) => ({
          pendingAction: parseAction(input, 'freeText', undefined, state.selectedTargetId),
        })),
      cancelPreview: () => set({ pendingAction: undefined }),
      commitAction: async () => {
        const { session, pendingAction, language } = get()
        if (!session || !pendingAction) return undefined
        const ruling = ruleAction(session, pendingAction)
        const nextState = ruling.nextState
        set({ session: nextState, pendingAction: undefined, actorLoading: nextState.status !== 'finished' })
        const targetId = pendingAction.targetId
        if (nextState.status !== 'finished' && targetId) {
          const target = roleById[targetId]
          const performance = await requestActorPerformance({
            locale: language,
            actionType: pendingAction.type,
            utterance: pendingAction.rawInput,
            round: nextState.round,
            exposureBand: nextState.risk >= 60 ? 'high' : nextState.risk >= 32 ? 'rising' : 'low',
            location: locations[nextState.locationId].name,
            player: {
              roleId: nextState.roleId,
              publicIdentity: nextState.role.publicIdentity,
            },
            target: {
              roleId: target.id,
              name: npcProfiles[targetId].callSign,
              publicIdentity: target.publicIdentity,
              posture: npcProfiles[targetId].posture,
            },
            allowedEvidence: nextState.knownClues.map((clue) => clue.detail),
          })
          set((current) => {
            if (!current.session || current.session.round !== nextState.round) return { actorLoading: false }
            return {
              actorLoading: false,
              session: {
                ...current.session,
                latestPerformance: performance,
                messages: [
                  ...current.session.messages,
                  {
                    id: `actor-${nextState.round}-${targetId}`,
                    sender: targetId,
                    channel: 'private',
                    round: nextState.round,
                    text: { zhCN: performance.line, en: performance.line },
                    aiMode: performance.mode,
                  },
                ],
              },
            }
          })
        } else if (nextState.status !== 'finished') {
          set({ actorLoading: false })
        }
        return nextState
      },
      resetRun: () =>
        set((state) => ({
          selectedRoleId: undefined,
          session: undefined,
          pendingAction: undefined,
          actorLoading: false,
          seed: createRandomSeed(),
          selectedTargetId: state.selectedTargetId,
        })),
    }),
    {
      name: 'seventh-district-preferences',
      partialize: (state): Preferences => ({
        language: state.language,
        audioEnabled: state.audioEnabled,
        volume: state.volume,
        reducedMotion: state.reducedMotion,
      }),
    },
  ),
)
